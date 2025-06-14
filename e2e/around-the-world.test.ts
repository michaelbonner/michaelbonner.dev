import { expect, test } from '@playwright/test';

test('can load all pages', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/blog');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/blog/screenshot-maker');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/blog/pagespeed-testing');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/blog/github-repositories-viewer-app');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/blog/git-branch-name-raycast-extension');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/blog/i-made-an-extension');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/blog/getting-started-as-a-web-developer-in-2022');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/blog/set-up-some-aliases');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/uses');
	await expect(page.locator('h1')).toBeVisible();

	await page.goto('/policies');
	await expect(page.locator('h1')).toBeVisible();
});
