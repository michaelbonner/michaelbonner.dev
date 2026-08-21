import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

/** Generous enough for a real suggestion, short enough to keep a Telegram message readable. */
const maxLengths = {
	restaurantName: 120,
	location: 120,
	tags: 120,
	notes: 1500,
	submittedBy: 120,
	submittedByEmail: 254
} as const;

const field = (data: FormData, key: string) => data.get(key)?.toString().trim() ?? '';

export const actions: Actions = {
	suggest: async ({ request, platform }) => {
		const turnstileSecret = env.TURNSTILE_SECRET_KEY;
		const telegramBotToken = env.TELEGRAM_BOT_TOKEN;
		const telegramChatId = env.TELEGRAM_CHAT_ID;

		// The suggestion has nowhere to go without the D1 binding, and no spam
		// protection without the Turnstile secret, so refuse rather than accept a
		// submission we would silently drop. `vite dev` and `vite preview` run
		// outside the Workers runtime, so they land here too.
		const database = platform?.env?.DB;

		if (!turnstileSecret || !telegramBotToken || !telegramChatId || !database) {
			const missing = [
				['TURNSTILE_SECRET_KEY', turnstileSecret],
				['TELEGRAM_BOT_TOKEN', telegramBotToken],
				['TELEGRAM_CHAT_ID', telegramChatId],
				['DB binding', database]
			]
				.filter(([, value]) => !value)
				.map(([key]) => key);

			console.error(`Missing required restaurant suggestion config: ${missing.join(', ')}`);
			return fail(500, {
				error: 'Suggestions are temporarily unavailable. Please try again later.'
			});
		}

		const data = await request.formData();
		const restaurantName = field(data, 'restaurantName');
		const location = field(data, 'location');
		const tags = field(data, 'tags');
		const notes = field(data, 'notes');
		const submittedBy = field(data, 'submittedBy');
		const submittedByEmail = field(data, 'submittedByEmail');
		const turnstileResponse = field(data, 'cf-turnstile-response');

		if (!restaurantName || !notes) {
			return fail(400, {
				error: 'Please give the restaurant a name and tell me why it belongs on the list.'
			});
		}

		const tooLong = Object.entries({
			restaurantName,
			location,
			tags,
			notes,
			submittedBy,
			submittedByEmail
		}).filter(([key, value]) => value.length > maxLengths[key as keyof typeof maxLengths]);

		if (tooLong.length > 0) {
			return fail(400, { error: 'That is longer than I can store. Please shorten it and resend.' });
		}

		// Verify Turnstile
		if (!turnstileResponse) {
			return fail(400, { error: 'Please complete the CAPTCHA.' });
		}

		const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				secret: turnstileSecret,
				response: turnstileResponse
			})
		});

		const verifyOutcome = await verifyRes.json();
		if (!verifyOutcome.success) {
			return fail(400, { error: 'CAPTCHA verification failed. Please try again.' });
		}

		// Store first, notify second: a suggestion that is saved but unannounced is
		// recoverable, one that was announced and lost is not.
		try {
			await database
				.prepare(
					`INSERT INTO restaurant_suggestions
						(restaurant_name, location, tags, notes, submitted_by, submitted_by_email)
					VALUES (?, ?, ?, ?, ?, ?)`
				)
				.bind(
					restaurantName,
					location || null,
					tags || null,
					notes,
					submittedBy || null,
					submittedByEmail || null
				)
				.run();
		} catch (error) {
			console.error('Failed to save restaurant suggestion:', error);
			return fail(500, { error: 'Failed to save your suggestion. Please try again later.' });
		}

		// Send Telegram notification
		const text = [
			'New restaurant suggestion!',
			'',
			`Restaurant: ${restaurantName}`,
			location ? `Location: ${location}` : null,
			tags ? `Food: ${tags}` : null,
			submittedBy ? `From: ${submittedBy}` : null,
			submittedByEmail ? `Email: ${submittedByEmail}` : null,
			'',
			'Why:',
			notes
		]
			.filter((line) => line !== null)
			.join('\n');

		const telegramRes = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id: telegramChatId,
				text: text
			})
		});

		// The row is already committed, so a failed notification is mine to notice
		// in the logs, not the visitor's to retry into a duplicate suggestion.
		if (!telegramRes.ok) {
			console.error(
				'Saved restaurant suggestion but failed to send Telegram message:',
				await telegramRes.text()
			);
		}

		return { success: true };
	}
};
