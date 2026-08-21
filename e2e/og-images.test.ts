import { expect, test } from '@playwright/test';
import { cards } from '../scripts/og-images.config.js';

/**
 * Every route that <Seo> gives a custom Open Graph card, paired with the file
 * scripts/generate-og-images.js writes for it.
 */
const routes = (cards as { name: string; route: string }[])
	.filter((card) => card.route.startsWith('/'))
	.map((card) => ({ route: card.route, ogPath: `/og/${card.name}.jpg` }));

test.describe.parallel('Open Graph images', () => {
	for (const { route, ogPath } of routes) {
		test(`${route} points at ${ogPath}`, async ({ page, baseURL }) => {
			await page.goto(route);

			const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
			const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');

			expect(ogImage).toBe(`${baseURL}${ogPath}`);
			expect(twitterImage).toBe(ogImage);

			// The card has to actually exist, or the share preview falls back to nothing
			const response = await page.request.get(ogPath);
			expect(response.status()).toBe(200);
			expect(response.headers()['content-type']).toContain('image/jpeg');
		});
	}

	test('every generated card is 1200x630', async ({ page }) => {
		// Load a real page first so the relative image paths resolve
		await page.goto('/');

		const sizes = await Promise.all(
			[...routes, { route: '(fallback)', ogPath: '/og/default.jpg' }].map(async ({ ogPath }) => {
				const size = await page.evaluate(
					(src) =>
						new Promise<{ width: number; height: number }>((resolve, reject) => {
							const image = new Image();
							image.onload = () => resolve({ width: image.width, height: image.height });
							image.onerror = () => reject(new Error(`Failed to load ${src}`));
							image.src = src;
						}),
					ogPath
				);

				return { ogPath, ...size };
			})
		);

		for (const size of sizes) {
			expect(size, `${size.ogPath} should be 1200x630`).toMatchObject({
				width: 1200,
				height: 630
			});
		}
	});
});
