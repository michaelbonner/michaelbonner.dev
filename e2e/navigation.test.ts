import { expect, test, type Page } from '@playwright/test';

const MOBILE = { width: 375, height: 800 };
const DESKTOP = { width: 1280, height: 900 };

const menuButton = (page: Page) => page.getByRole('button', { name: 'Menu' });
const mobilePanel = (page: Page) => page.locator('#mobile-nav');
const desktopNav = (page: Page) => page.locator('header nav[aria-label="Main"]');

test.describe('Header navigation', () => {
	test('keeps the desktop header to three links and hides the menu button', async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/');

		await expect(desktopNav(page).getByRole('link')).toHaveText(['Blog', 'Uses', 'Contact']);
		await expect(menuButton(page)).toBeHidden();
	});

	/*
	 * "Home" is deliberately absent from the desktop header: the wordmark beside
	 * it already goes there, so the slot would be spent twice.
	 */
	test('sends the wordmark home', async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/uses');

		await page.getByRole('link', { name: 'Michael Bonner' }).first().click();
		await expect(page).toHaveURL('/');
	});

	test('marks the current section, including on a child route', async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/blog/pagespeed-testing');

		await expect(desktopNav(page).getByRole('link', { name: 'Blog' })).toHaveAttribute(
			'aria-current',
			'page'
		);
		await expect(desktopNav(page).getByRole('link', { name: 'Uses' })).not.toHaveAttribute(
			'aria-current',
			'page'
		);
	});
});

test.describe('Mobile navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize(MOBILE);
		await page.goto('/');
	});

	test('swaps the inline links for a labelled menu button', async ({ page }) => {
		await expect(desktopNav(page)).toBeHidden();
		await expect(menuButton(page)).toBeVisible();
		await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'false');
		await expect(mobilePanel(page)).toHaveCount(0);
	});

	/* The button is the only nav affordance on a phone, so it has to be thumb-sized. */
	test('gives the menu button a 44px touch target', async ({ page }) => {
		const box = await menuButton(page).boundingBox();
		expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
	});

	/*
	 * The whole point of the panel: the pages that live only in the footer are
	 * reachable from the top of the page, where a phone user actually is.
	 */
	test('carries the footer-only pages so they need no scroll to reach', async ({ page }) => {
		await menuButton(page).click();

		await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'true');
		await expect(mobilePanel(page).getByRole('link')).toHaveText([
			'Home',
			'Blog',
			'Uses',
			'Favorite Restaurants',
			'Patents',
			'Contact'
		]);
	});

	test('closes on Escape and hands focus back to the button', async ({ page }) => {
		await menuButton(page).click();
		await expect(mobilePanel(page)).toBeVisible();

		await page.keyboard.press('Escape');

		await expect(mobilePanel(page)).toHaveCount(0);
		await expect(menuButton(page)).toBeFocused();
	});

	test('closes when something outside the header is pressed', async ({ page }) => {
		await menuButton(page).click();
		await expect(mobilePanel(page)).toBeVisible();

		await page.locator('footer').click({ position: { x: 5, y: 5 } });

		await expect(mobilePanel(page)).toHaveCount(0);
		await expect(menuButton(page)).toHaveAttribute('aria-expanded', 'false');
	});

	test('navigates and leaves the panel closed behind it', async ({ page }) => {
		await menuButton(page).click();
		await mobilePanel(page).getByRole('link', { name: 'Favorite Restaurants' }).click();

		await expect(page).toHaveURL('/restaurants');
		await expect(mobilePanel(page)).toHaveCount(0);

		await menuButton(page).click();
		await expect(mobilePanel(page).locator('[aria-current="page"]')).toHaveText(
			'Favorite Restaurants'
		);
	});

	test('opens from the keyboard and puts the first link next in the tab order', async ({
		page
	}) => {
		await menuButton(page).focus();
		await page.keyboard.press('Enter');

		await expect(mobilePanel(page)).toBeVisible();

		await page.keyboard.press('Tab');
		await expect(mobilePanel(page).getByRole('link', { name: 'Home' })).toBeFocused();
	});

	/*
	 * `--header-height` is what anchor scroll-padding and the restaurants map's
	 * sticky offset are both derived from, so it has to match what the header
	 * actually measures at every width.
	 */
	test('keeps the header the height its token claims', async ({ page }) => {
		for (const viewport of [MOBILE, { width: 640, height: 800 }, DESKTOP]) {
			await page.setViewportSize(viewport);

			const measured = await page
				.locator('header')
				.first()
				.evaluate((el) => el.getBoundingClientRect().height);
			const token = await page.evaluate(() => {
				const raw = getComputedStyle(document.documentElement)
					.getPropertyValue('--header-height')
					.trim();
				return parseFloat(raw) * parseFloat(getComputedStyle(document.documentElement).fontSize);
			});

			expect(Math.abs(measured - token), `at ${viewport.width}px`).toBeLessThanOrEqual(1);
		}
	});
});

test.describe('Footer navigation', () => {
	test('keeps the full set of links, including the policies page', async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/');

		await expect(page.locator('footer nav[aria-label="Footer"]').getByRole('link')).toHaveText([
			'Home',
			'Blog',
			'Uses',
			'Favorite Restaurants',
			'Patents',
			'Policies',
			'Contact'
		]);
	});
});

test.describe('Homepage links to the quieter pages', () => {
	test.beforeEach(async ({ page }) => {
		await page.setViewportSize(DESKTOP);
		await page.goto('/');
	});

	/*
	 * These three were reachable only from the footer. A link in the copy that is
	 * already about the subject beats a menu item nobody opens.
	 */
	test('links to uses, patents, and restaurants from the body copy', async ({ page }) => {
		const main = page.locator('main');

		await expect(main.locator('a[href="/uses"]')).toHaveCount(1);
		await expect(main.locator('a[href="/patents"]')).toHaveCount(1);
		await expect(main.locator('a[href="/restaurants"]')).toHaveCount(1);
	});

	test('puts the uses link in the section about tooling', async ({ page }) => {
		const stack = page.locator('section').filter({ hasText: 'Tools I use' });

		await stack.locator('a[href="/uses"]').click();
		await expect(page).toHaveURL('/uses');
	});
});
