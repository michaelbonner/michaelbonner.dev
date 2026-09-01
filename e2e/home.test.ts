import { expect, test } from '@playwright/test';

/**
 * Side projects are the tallest thing on the homepage, so only the first two
 * rows are shown until the reader asks for the rest. The cards are hidden with
 * CSS rather than removed, which is what keeps the section crawlable — these
 * tests pin both halves of that bargain.
 */
const INITIAL_COUNT = 8;

const sideProjects = (page: import('@playwright/test').Page) => page.locator('#side-projects li');

const toggle = (page: import('@playwright/test').Page) =>
	page.locator('#side-projects').getByRole('button');

test.describe('Homepage side projects', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('shows two rows up front and reveals the rest on request', async ({ page }) => {
		const cards = sideProjects(page);
		const total = await cards.count();
		expect(total).toBeGreaterThan(INITIAL_COUNT);

		const button = toggle(page);
		await expect(button).toHaveAttribute('aria-expanded', 'false');
		await expect(button).toHaveText(`Show all ${total} side projects`);
		await expect(cards.filter({ visible: true })).toHaveCount(INITIAL_COUNT);

		await button.click();

		await expect(button).toHaveAttribute('aria-expanded', 'true');
		await expect(button).toHaveText('Show fewer');
		await expect(cards.filter({ visible: true })).toHaveCount(total);
	});

	test('keeps every project in the DOM so the section stays crawlable', async ({ page }) => {
		// The concern is the server-rendered HTML, not what hydration does to it, so
		// this reads the response body rather than the live DOM.
		const html = await (await page.request.get('/')).text();
		const titles = await sideProjects(page).locator('h3').allTextContents();

		expect(titles.length).toBeGreaterThan(INITIAL_COUNT);
		for (const title of titles) {
			expect(html).toContain(title.trim());
		}
	});

	test('collapsing leaves the reader where they clicked', async ({ page }) => {
		const button = toggle(page);
		await button.click();
		await expect(button).toHaveAttribute('aria-expanded', 'true');

		await button.scrollIntoViewIfNeeded();
		const before = await button.evaluate((node) => node.getBoundingClientRect().top);

		await button.click();
		await expect(button).toHaveAttribute('aria-expanded', 'false');

		// Without pinning the button, collapsing the extra rows out from above it
		// dumps the reader roughly two thousand pixels further down the page.
		const after = await button.evaluate((node) => node.getBoundingClientRect().top);
		expect(Math.abs(after - before)).toBeLessThan(5);
	});

	test('screenshots in a row are cropped to the same height', async ({ page }) => {
		// The cards are grid items, so a tall row would otherwise stretch each
		// card's image by a different amount and leave the row visibly ragged.
		const heights = await page
			.locator('#projects article img')
			.evaluateAll((images) => [
				...new Set(images.map((image) => Math.round(image.getBoundingClientRect().height)))
			]);

		expect(heights).toHaveLength(1);
	});

	test('lines up the Visit links along the bottom of each row', async ({ page }) => {
		// A two-line teaser next to a three-line one used to leave one card's links
		// floating mid-card. The bottom row of the card grid pins them instead.
		const tops = await page
			.locator('#side-projects li:visible article > div:last-child')
			.evaluateAll((rows) => rows.map((row) => Math.round(row.getBoundingClientRect().top)));

		expect(tops.length).toBe(INITIAL_COUNT);
		// Two rows of four, so exactly two distinct baselines.
		expect(new Set(tops).size).toBe(2);
	});

	test('clamps the dense teasers visually without shortening them', async ({ page }) => {
		// The four-column grid clamps to three lines. That has to stay a CSS clamp:
		// truncating the strings themselves would take the copy away from search and
		// from screen readers too.
		const teaser = sideProjects(page).first().locator('p');

		await expect(teaser).toHaveCSS('-webkit-line-clamp', '3');
		const rendered = (await teaser.textContent())?.trim() ?? '';
		expect(rendered).not.toMatch(/[.…]{3}$/);
		expect(rendered.length).toBeGreaterThan(120);
	});

	test('does not scroll sideways on a narrow screen', async ({ page }) => {
		await page.setViewportSize({ width: 320, height: 844 });
		await sideProjects(page).first().scrollIntoViewIfNeeded();

		const { scrollWidth, clientWidth } = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth
		}));
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
	});
});
