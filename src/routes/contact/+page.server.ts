import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const requiredEnvVars = [
			'TURNSTILE_SECRET_KEY',
			'TELEGRAM_BOT_TOKEN',
			'TELEGRAM_CHAT_ID'
		] as const;
		const missingEnvVars = requiredEnvVars.filter((key) => !env[key]);

		if (missingEnvVars.length > 0) {
			console.error(`Missing required contact env vars: ${missingEnvVars.join(', ')}`);
			return fail(500, { error: 'Contact form is temporarily unavailable. Please try again later.' });
		}

		const data = await request.formData();
		const name = data.get('name')?.toString();
		const email = data.get('email')?.toString();
		const message = data.get('message')?.toString();
		const turnstileResponse = data.get('cf-turnstile-response')?.toString();

		if (!name || !email || !message) {
			return fail(400, { error: 'Please fill out all fields.' });
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
				secret: env.TURNSTILE_SECRET_KEY,
				response: turnstileResponse
			})
		});

		const verifyOutcome = await verifyRes.json();
		if (!verifyOutcome.success) {
			return fail(400, { error: 'CAPTCHA verification failed. Please try again.' });
		}

		// Send Telegram notification
		const text = `New contact form submission!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

		const telegramRes = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id: env.TELEGRAM_CHAT_ID,
				text: text
			})
		});

		if (!telegramRes.ok) {
			console.error('Failed to send Telegram message:', await telegramRes.text());
			return fail(500, { error: 'Failed to send message. Please try again later.' });
		}

		return { success: true };
	}
};
