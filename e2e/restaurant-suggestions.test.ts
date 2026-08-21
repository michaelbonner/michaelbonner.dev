import { expect, test, type Locator, type Page } from '@playwright/test';

/** The form action `use:enhance` posts to. */
const isSuggestAction = (url: URL) => url.pathname === '/restaurants' && url.search === '?/suggest';

/**
 * The envelope `use:enhance` expects back from an action: a JSON result whose
 * `data` is a devalue-encoded string.
 */
const actionResult = (type: 'success' | 'failure', status: number, data: string) => ({
	status,
	contentType: 'application/json',
	body: JSON.stringify({ type, status, data })
});

const saved = actionResult('success', 200, '[{"success":1},true]');

const rejected = (message: string) =>
	actionResult('failure', 400, `[{"error":1},${JSON.stringify(message)}]`);

/**
 * Intercepts the action so the tests never depend on Telegram, D1, or Turnstile
 * being configured. Returns the bodies posted to it, in order.
 */
const interceptSuggest = async (page: Page, response: ReturnType<typeof actionResult>) => {
	const posted: string[] = [];

	await page.route(isSuggestAction, async (route) => {
		posted.push(route.request().postData() ?? '');
		await route.fulfill(response);
	});

	return posted;
};

/** Whether the browser is holding a required field back as empty. */
const valueMissing = (field: Locator) =>
	field.evaluate(
		(element: HTMLInputElement | HTMLTextAreaElement) => element.validity.valueMissing
	);

const openDialog = async (page: Page) => {
	await page.getByRole('button', { name: 'Suggest a restaurant' }).first().click();

	const dialog = page.getByRole('dialog');
	await expect(dialog).toBeVisible();

	return dialog;
};

const fillSuggestion = async (dialog: Locator) => {
	await dialog.getByRole('textbox', { name: 'Restaurant' }).fill('Test Kitchen');
	await dialog.getByRole('textbox', { name: 'Location' }).fill('Sugarhouse');
	await dialog.getByRole('textbox', { name: 'Food' }).fill('Tacos');
	await dialog
		.getByRole('textbox', { name: 'Why it belongs on the list' })
		.fill('The al pastor is the best in the valley.');
	await dialog.getByRole('textbox', { name: 'Your name' }).fill('Testy McTest');
	await dialog.getByRole('textbox', { name: 'Your email' }).fill('testy@example.com');
};

test.describe('Suggest a restaurant', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/restaurants');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('opens from the page and closes with Escape', async ({ page }) => {
		await expect(page.getByRole('dialog')).toBeHidden();

		const dialog = await openDialog(page);
		// Opening puts the cursor where the visitor starts typing rather than on
		// the close button the browser would focus by default.
		await expect(dialog.getByRole('textbox', { name: 'Restaurant' })).toBeFocused();

		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).toBeHidden();
	});

	test('closes from the backdrop and from Cancel', async ({ page }) => {
		await openDialog(page);
		// The backdrop of a modal dialog covers the viewport, so a click in the
		// corner lands on it rather than on the page underneath.
		await page.mouse.click(4, 4);
		await expect(page.getByRole('dialog')).toBeHidden();

		const dialog = await openDialog(page);
		await dialog.getByRole('button', { name: 'Cancel' }).click();
		await expect(page.getByRole('dialog')).toBeHidden();
	});

	test('will not submit without a restaurant and a reason', async ({ page }) => {
		// Scoped to the action rather than counting every POST on the page: the
		// site's analytics beacons are POSTs too, and they fire here.
		const posted = await interceptSuggest(page, saved);

		const dialog = await openDialog(page);
		const name = dialog.getByRole('textbox', { name: 'Restaurant' });
		const why = dialog.getByRole('textbox', { name: 'Why it belongs on the list' });

		await dialog.getByRole('button', { name: 'Send suggestion' }).click();

		// The empty restaurant field is what holds the submission back, so the
		// dialog is still on the form and nothing reached the action.
		await expect(name).toBeVisible();
		expect(await valueMissing(name)).toBe(true);
		expect(posted).toHaveLength(0);

		// A name alone is not enough either; now the reason is the one holding it.
		await name.fill('Test Kitchen');
		await dialog.getByRole('button', { name: 'Send suggestion' }).click();
		await expect(why).toBeVisible();
		expect(await valueMissing(why)).toBe(true);
		expect(posted).toHaveLength(0);
	});

	test('sends every field to the suggest action and confirms it was saved', async ({ page }) => {
		const posted = await interceptSuggest(page, saved);

		const dialog = await openDialog(page);
		await fillSuggestion(dialog);
		await dialog.getByRole('button', { name: 'Send suggestion' }).click();

		await expect(dialog.getByText('Thanks', { exact: false })).toBeVisible();

		expect(posted).toHaveLength(1);
		const fields = new URLSearchParams(posted[0]);
		expect(Object.fromEntries(fields)).toMatchObject({
			restaurantName: 'Test Kitchen',
			location: 'Sugarhouse',
			tags: 'Tacos',
			notes: 'The al pastor is the best in the valley.',
			submittedBy: 'Testy McTest',
			submittedByEmail: 'testy@example.com'
		});

		await dialog.getByRole('button', { name: 'Done' }).click();
		await expect(page.getByRole('dialog')).toBeHidden();
	});

	test("shows the server's error and keeps the filled-in suggestion", async ({ page }) => {
		await interceptSuggest(page, rejected('Suggestions are temporarily unavailable.'));

		const dialog = await openDialog(page);
		await fillSuggestion(dialog);
		await dialog.getByRole('button', { name: 'Send suggestion' }).click();

		await expect(dialog.getByRole('alert')).toHaveText('Suggestions are temporarily unavailable.');
		// Nothing typed is thrown away, so the visitor can fix and resend.
		await expect(dialog.getByRole('textbox', { name: 'Restaurant' })).toHaveValue('Test Kitchen');
	});

	test('starts fresh when it is reopened after a suggestion', async ({ page }) => {
		await interceptSuggest(page, saved);

		const dialog = await openDialog(page);
		await fillSuggestion(dialog);
		await dialog.getByRole('button', { name: 'Send suggestion' }).click();
		await expect(dialog.getByRole('button', { name: 'Done' })).toBeVisible();
		await dialog.getByRole('button', { name: 'Done' }).click();

		const reopened = await openDialog(page);
		await expect(reopened.getByRole('textbox', { name: 'Restaurant' })).toHaveValue('');
		await expect(reopened.getByRole('button', { name: 'Send suggestion' })).toBeVisible();
	});

	test('abandons a submission the dialog was closed on', async ({ page }) => {
		// Held open so the dialog can be closed while the request is in flight.
		let release = () => {};
		const held = new Promise<void>((resolve) => {
			release = resolve;
		});

		await page.route(isSuggestAction, async (route) => {
			await held;
			// Aborting the request makes fulfil throw, which is the expected path
			// here rather than a failure.
			await route.fulfill(saved).catch(() => {});
		});

		const dialog = await openDialog(page);
		await fillSuggestion(dialog);
		await dialog.getByRole('button', { name: 'Send suggestion' }).click();

		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).toBeHidden();

		// The response lands after the dialog is gone; it must not be applied to
		// the next one.
		release();

		const reopened = await openDialog(page);
		await expect(reopened.getByRole('textbox', { name: 'Restaurant' })).toHaveValue('');
		// Never stuck on "Sending…", and never showing the previous thank-you.
		await expect(reopened.getByRole('button', { name: 'Send suggestion' })).toBeEnabled();
		await expect(reopened.getByRole('button', { name: 'Done' })).toBeHidden();
	});

	test('leaves the filters and the shareable URL untouched', async ({ page }) => {
		await interceptSuggest(page, saved);

		await page.getByLabel('Tag', { exact: true }).selectOption('Pizza');
		await expect(page).toHaveURL(/tag=Pizza/);
		const rows = await page.locator('tbody tr').count();

		const dialog = await openDialog(page);
		await fillSuggestion(dialog);
		await dialog.getByRole('button', { name: 'Send suggestion' }).click();
		await expect(dialog.getByRole('button', { name: 'Done' })).toBeVisible();
		await dialog.getByRole('button', { name: 'Done' }).click();

		await expect(page).toHaveURL(/tag=Pizza/);
		await expect(page.locator('tbody tr')).toHaveCount(rows);
	});
});
