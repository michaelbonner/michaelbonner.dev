import { expect, test } from '@playwright/test';
import { blogArticlesTestData } from './test-data/blog-articles';

/**
 * The index dropped its card panels to match the project grids on the homepage,
 * which means the layout no longer has a box holding each entry's parts in line.
 * These cover what that removal put at risk: the screenshots staying a uniform
 * crop, and the tag rows staying on a shared baseline.
 */

/** Every entry below the lead post, which gets a wider row of its own. */
const gridEntries = (page: import('@playwright/test').Page) =>
	page.locator('#posts > li:not(:first-child)');

const distinct = (values: number[]) => new Set(values).size;

test.describe('Blog index', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/blog');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('lists every article', async ({ page }) => {
		await expect(page.locator('#posts > li')).toHaveCount(blogArticlesTestData.length);
	});

	test('crops every screenshot in the grid to the same height', async ({ page }) => {
		const entries = gridEntries(page);
		await entries.last().scrollIntoViewIfNeeded();

		const heights = await entries
			.locator('img')
			.evaluateAll((images) =>
				images.map((image) => Math.round(image.getBoundingClientRect().height))
			);

		expect(heights.length).toBe(blogArticlesTestData.length - 1);
		expect(distinct(heights)).toBe(1);
	});

	test('keeps the tag rows on a shared baseline', async ({ page }) => {
		// Teasers run to different lengths, so without the `auto 1fr` row the tags
		// float at whatever height the copy happened to end at.
		const entries = gridEntries(page);
		await entries.last().scrollIntoViewIfNeeded();

		const tops = await entries
			.locator('ul')
			.evaluateAll((rows) => rows.map((row) => Math.round(row.getBoundingClientRect().top)));

		// Three to a row, so the count of distinct baselines is the number of rows.
		expect(tops.length).toBe(blogArticlesTestData.length - 1);
		expect(distinct(tops)).toBe(Math.ceil(tops.length / 3));
	});

	test('does not scroll sideways on a narrow screen', async ({ page }) => {
		await page.setViewportSize({ width: 320, height: 844 });
		await gridEntries(page).first().scrollIntoViewIfNeeded();

		const { scrollWidth, clientWidth } = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth
		}));
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
	});
});
