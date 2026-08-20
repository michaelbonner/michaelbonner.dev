import { expect, test } from '@playwright/test';
import { restaurants } from '../src/lib/data/restaurants';

/** Names as they appear in the desktop table, in render order. */
const renderedNames = (page: import('@playwright/test').Page) =>
	page.locator('tbody tr td:first-child > span:first-child').allTextContents();

test.describe('Restaurants page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/restaurants');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('lists every restaurant', async ({ page }) => {
		await expect(page.locator('tbody tr')).toHaveCount(restaurants.length);
		await expect(
			page.getByText(`Showing ${restaurants.length} of ${restaurants.length} restaurants`)
		).toBeVisible();
	});

	test('defaults to highest rated first', async ({ page }) => {
		const ratings = await page.locator('tbody tr td:last-child').allTextContents();
		const values = ratings.map((text) => Number(text.split('/')[0]));
		expect(values).toEqual([...values].sort((a, b) => b - a));
	});

	test('sorts by a column header, and reverses on a second click', async ({ page }) => {
		const header = page.getByRole('button', { name: /^Restaurant/ });

		await header.click();
		const ascending = await renderedNames(page);
		expect(ascending).toEqual([...ascending].sort((a, b) => a.localeCompare(b)));

		await header.click();
		const descending = await renderedNames(page);
		expect(descending).toEqual([...ascending].reverse());
	});

	test('filters by tag', async ({ page }) => {
		const tag = restaurants[0].tags[0];
		const expected = restaurants.filter((restaurant) => restaurant.tags.includes(tag));

		await page.getByLabel('Tag', { exact: true }).selectOption(tag);

		await expect(page.locator('tbody tr')).toHaveCount(expected.length);
		for (const restaurant of expected) {
			await expect(page.locator(`tr[data-restaurant="${restaurant.name}"]`)).toBeVisible();
		}
	});

	test('filters by search text', async ({ page }) => {
		const target = restaurants[0];

		await page.getByLabel('Search', { exact: true }).fill(target.name);

		await expect(page.locator(`tr[data-restaurant="${target.name}"]`)).toBeVisible();
		await expect(page.locator('tbody tr')).toHaveCount(1);
	});

	test('clears filters', async ({ page }) => {
		await page.getByLabel('Search', { exact: true }).fill(restaurants[0].name);
		await expect(page.locator('tbody tr')).toHaveCount(1);

		await page.getByRole('button', { name: 'Clear filters' }).click();
		await expect(page.locator('tbody tr')).toHaveCount(restaurants.length);
	});

	test('shows an empty state when nothing matches', async ({ page }) => {
		await page.getByLabel('Search', { exact: true }).fill('definitely-not-a-restaurant');

		await expect(page.getByText('No restaurants match those filters.')).toBeVisible();
		await expect(page.locator('tbody tr')).toHaveCount(0);
	});

	test('renders the map with a pin for every geocoded restaurant', async ({ page }) => {
		const geocoded = restaurants.filter((r) => r.lat != null && r.lng != null);

		await expect(page.locator('.leaflet-container')).toBeVisible();
		await expect(page.locator('.restaurant-pin')).toHaveCount(geocoded.length);
	});

	test('color codes pins by rating and explains the scale', async ({ page }) => {
		await expect(page.getByLabel('Pin colors by rating')).toContainText('10');
		await expect(page.getByLabel('Pin colors by rating')).toContainText('9');
		await expect(page.getByLabel('Pin colors by rating')).toContainText('8');

		for (const restaurant of restaurants.filter((item) => item.lat != null && item.lng != null)) {
			const expectedBand =
				restaurant.rating >= 10 ? 'top' : restaurant.rating >= 9 ? 'great' : 'good';
			await expect(
				page.locator(`.restaurant-pin[title="${restaurant.name}"] .restaurant-pin__dot`)
			).toHaveClass(new RegExp(`restaurant-pin__dot--${expectedBand}`));
		}
	});

	test('shows a restaurant preview when a pin is hovered or focused', async ({ page }) => {
		const pin = page.locator('.restaurant-pin[title="Antica Sicilia"]');

		await pin.hover();
		await expect(page.locator('.restaurant-preview')).toContainText('Antica Sicilia');
		await expect(page.locator('.restaurant-preview')).toContainText('Italian');
		await expect(page.locator('.restaurant-preview__image')).toBeVisible();

		await page.mouse.move(0, 0);
		await expect(page.locator('.restaurant-preview')).toHaveCount(0);

		await pin.focus();
		await expect(page.locator('.restaurant-preview')).toContainText('Antica Sicilia');
	});

	test('selecting a row opens its map popup and closes it again', async ({ page }) => {
		const target = restaurants.find((r) => r.lat != null && r.lng != null);
		test.skip(!target, 'No geocoded restaurants; run `bun run geocode` first.');

		const row = page.locator(`tr[data-restaurant="${target!.name}"]`);

		await row.click();
		await expect(page.locator('.leaflet-popup')).toContainText(target!.name);
		await expect(page.locator('.restaurant-popup__image')).toBeVisible();

		await row.click();
		await expect(page.locator('.leaflet-popup')).toHaveCount(0);
	});
});
