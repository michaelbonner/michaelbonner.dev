import { expect, test } from '@playwright/test';

const sectionCards = (page: import('@playwright/test').Page, id: string) =>
	page.locator(`#${id} li`);

test.describe('Homepage project groups', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('keeps the featured projects and separates the remaining work by type', async ({ page }) => {
		await expect(page.locator('#projects')).toContainText("Projects I'm proud of");
		await expect(page.locator('#my-saas')).toContainText('My SaaS');
		await expect(page.locator('#just-for-fun')).toContainText('Just for fun');
		await expect(page.locator('#developer-tools')).toContainText('Developer tools');
		await expect(page.locator('#other-client-sites')).toContainText('Other client sites');

		await expect(page.locator('#my-saas')).toContainText('OfficeLunch');
		await expect(page.locator('#just-for-fun')).toContainText('Podcasts I Listen To');
		await expect(page.locator('#just-for-fun')).toContainText('Days Until');
		await expect(page.locator('#just-for-fun')).toContainText('NHL Arenas To Visit');
		await expect(page.locator('#just-for-fun')).toContainText('Which Route Is Faster');
		await expect(page.locator('#developer-tools')).toContainText('Screenshot Maker');
		await expect(page.locator('#developer-tools')).toContainText('Redirects Wizard');
		await expect(page.locator('#developer-tools')).toContainText('MP4 Compressor');
		await expect(page.locator('#developer-tools')).toContainText('MP4 to OGV Converter');
		await expect(page.locator('#other-client-sites')).toContainText('MetaCensus');
	});

	test('renders every project group without a show-more control', async ({ page }) => {
		const saasCards = sectionCards(page, 'my-saas');
		const justForFunCards = sectionCards(page, 'just-for-fun');
		const developerToolCards = sectionCards(page, 'developer-tools');

		await expect(saasCards).toHaveCount(6);
		await expect(justForFunCards).toHaveCount(4);
		await expect(developerToolCards).toHaveCount(10);
		await expect(saasCards.filter({ visible: true })).toHaveCount(6);
		await expect(justForFunCards.filter({ visible: true })).toHaveCount(4);
		await expect(developerToolCards.filter({ visible: true })).toHaveCount(10);
		await expect(page.getByRole('button', { name: /show all|show fewer/i })).toHaveCount(0);
	});

	test('keeps grouped projects in the server-rendered HTML', async ({ page }) => {
		const html = await (await page.request.get('/')).text();
		const titles = await page
			.locator('#my-saas h3, #just-for-fun h3, #developer-tools h3')
			.allTextContents();

		for (const title of titles) {
			expect(html).toContain(title.trim());
		}
	});

	test('screenshots in a row are cropped to the same height', async ({ page }) => {
		const heights = await page
			.locator('#projects article img')
			.evaluateAll((images) => [
				...new Set(images.map((image) => Math.round(image.getBoundingClientRect().height)))
			]);

		expect(heights).toHaveLength(1);
	});

	test('does not scroll sideways on a narrow screen', async ({ page }) => {
		await page.setViewportSize({ width: 320, height: 844 });
		await sectionCards(page, 'my-saas').first().scrollIntoViewIfNeeded();

		const { scrollWidth, clientWidth } = await page.evaluate(() => ({
			scrollWidth: document.documentElement.scrollWidth,
			clientWidth: document.documentElement.clientWidth
		}));
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
	});
});
