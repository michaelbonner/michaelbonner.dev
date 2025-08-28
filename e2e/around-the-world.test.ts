import { expect, test } from '@playwright/test';
import { blogArticlesTestData } from './test-data/blog-articles.ts';

/**
 * Calculate string similarity using Levenshtein distance
 * Returns a value between 0 (completely different) and 1 (identical)
 */
function calculateStringSimilarity(str1: string, str2: string): number {
	const len1 = str1.length;
	const len2 = str2.length;

	if (len1 === 0) return len2 === 0 ? 1 : 0;
	if (len2 === 0) return 0;

	const matrix = Array(len2 + 1)
		.fill(null)
		.map(() => Array(len1 + 1).fill(null));

	for (let i = 0; i <= len1; i++) matrix[0][i] = i;
	for (let j = 0; j <= len2; j++) matrix[j][0] = j;

	for (let j = 1; j <= len2; j++) {
		for (let i = 1; i <= len1; i++) {
			const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
			matrix[j][i] = Math.min(
				matrix[j - 1][i] + 1, // deletion
				matrix[j][i - 1] + 1, // insertion
				matrix[j - 1][i - 1] + cost // substitution
			);
		}
	}

	const maxLen = Math.max(len1, len2);
	return (maxLen - matrix[len2][len1]) / maxLen;
}

test.describe('Static Routes', () => {
	test('can load static pages', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toBeVisible();

		await page.goto('/blog');
		await expect(page.locator('h1')).toBeVisible();

		await page.goto('/uses');
		await expect(page.locator('h1')).toBeVisible();

		await page.goto('/policies');
		await expect(page.locator('h1')).toBeVisible();
	});
});

test.describe.parallel('Dynamic Blog Routes', () => {
	// Validate blogArticles data before running tests
	test.beforeAll(() => {
		// Comprehensive data structure validation
		if (!blogArticlesTestData) {
			throw new Error(
				'VALIDATION ERROR: blogArticlesTestData is not defined. Ensure the test data file is properly imported and exported.'
			);
		}

		if (!Array.isArray(blogArticlesTestData)) {
			throw new Error(
				`VALIDATION ERROR: blogArticlesTestData must be an array, but received ${typeof blogArticlesTestData}. Check the test data file structure.`
			);
		}

		if (blogArticlesTestData.length === 0) {
			throw new Error(
				'VALIDATION ERROR: blogArticlesTestData array is empty - no blog routes to test. Add blog articles to the test data or check if the data is being loaded correctly.'
			);
		}

		// Validate each article has required properties with detailed error reporting
		const validationErrors: string[] = [];

		blogArticlesTestData.forEach((article, index) => {
			const articleContext = `Article at index ${index}`;

			// Check if article is an object
			if (!article || typeof article !== 'object') {
				validationErrors.push(
					`${articleContext}: Must be an object, but received ${typeof article}`
				);
				return;
			}

			// Validate slug property
			if (!article.slug) {
				validationErrors.push(`${articleContext}: Missing required 'slug' property`);
			} else if (typeof article.slug !== 'string') {
				validationErrors.push(
					`${articleContext}: 'slug' must be a string, but received ${typeof article.slug}`
				);
			} else if (article.slug.trim().length === 0) {
				validationErrors.push(`${articleContext}: 'slug' cannot be empty or whitespace-only`);
			} else if (!/^[a-z0-9-]+$/.test(article.slug)) {
				validationErrors.push(
					`${articleContext}: 'slug' "${article.slug}" contains invalid characters. Only lowercase letters, numbers, and hyphens are allowed`
				);
			}

			// Validate title property
			if (!article.title) {
				validationErrors.push(`${articleContext}: Missing required 'title' property`);
			} else if (typeof article.title !== 'string') {
				validationErrors.push(
					`${articleContext}: 'title' must be a string, but received ${typeof article.title}`
				);
			} else if (article.title.trim().length === 0) {
				validationErrors.push(`${articleContext}: 'title' cannot be empty or whitespace-only`);
			}
		});

		// Check for duplicate slugs
		const slugs = blogArticlesTestData.map((article) => article.slug).filter(Boolean);
		const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
		if (duplicateSlugs.length > 0) {
			validationErrors.push(`Duplicate slugs found: ${[...new Set(duplicateSlugs)].join(', ')}`);
		}

		// Throw comprehensive validation error if any issues found
		if (validationErrors.length > 0) {
			throw new Error(
				`VALIDATION ERROR: Blog articles data validation failed:\n${validationErrors.map((error) => `  - ${error}`).join('\n')}\n\nPlease fix these issues in the test data before running the tests.`
			);
		}

		console.log(
			`✓ Blog articles data validation passed. Found ${blogArticlesTestData.length} valid articles to test.`
		);
		console.log(
			`✓ Test execution optimized with parallel processing for ${blogArticlesTestData.length} blog routes.`
		);
	});

	// Generate dynamic tests for each blog article
	blogArticlesTestData.forEach((article) => {
		test(`can load blog route: /blog/${article.slug}`, async ({ page }) => {
			const blogUrl = `/blog/${article.slug}`;
			const testContext = {
				slug: article.slug,
				title: article.title,
				url: blogUrl,
				timestamp: new Date().toISOString()
			};

			try {
				// Navigate to the blog route with timeout and error handling
				const navigationStart = Date.now();
				await page.goto(blogUrl, {
					waitUntil: 'domcontentloaded',
					timeout: 30000
				});
				const navigationTime = Date.now() - navigationStart;

				// Verify the page loads successfully by checking for h1 element
				const h1Element = page.locator('h1');

				// Wait for h1 element with detailed timeout handling
				try {
					await expect(h1Element).toBeVisible({ timeout: 10000 });
				} catch (visibilityError) {
					// Get page status and additional debugging info
					const pageTitle = await page.title().catch(() => 'Unable to get page title');
					const pageUrl = page.url();
					const h1Count = await page.locator('h1').count();

					throw new Error(
						`CONTENT ERROR: h1 element not visible on blog route\n` +
							`  Route: ${blogUrl}\n` +
							`  Expected article: "${article.title}"\n` +
							`  Actual page URL: ${pageUrl}\n` +
							`  Page title: ${pageTitle}\n` +
							`  H1 elements found: ${h1Count}\n` +
							`  Navigation time: ${navigationTime}ms\n` +
							`  Debug: Check if the route exists and renders properly\n` +
							`  Original error: ${visibilityError.message}`
					);
				}

				// Extract the page title from the h1 element and verify it matches expected title
				const actualTitle = await h1Element.textContent();

				if (!actualTitle) {
					// Get additional page context for debugging
					const pageTitle = await page.title().catch(() => 'Unable to get page title');
					const h1Html = await h1Element.innerHTML().catch(() => 'Unable to get h1 HTML');

					throw new Error(
						`CONTENT ERROR: h1 element is visible but has no text content\n` +
							`  Route: ${blogUrl}\n` +
							`  Expected title: "${article.title}"\n` +
							`  Page title: ${pageTitle}\n` +
							`  H1 HTML: ${h1Html}\n` +
							`  Debug: The h1 element exists but is empty - check the page template`
					);
				}

				// Verify the page title matches the expected article title
				const trimmedTitle = actualTitle.trim();
				if (trimmedTitle !== article.title) {
					// Get additional context for title mismatch debugging
					const pageTitle = await page.title().catch(() => 'Unable to get page title');
					const similarity = calculateStringSimilarity(trimmedTitle, article.title);

					throw new Error(
						`CONTENT ERROR: Page title mismatch\n` +
							`  Route: ${blogUrl}\n` +
							`  Expected: "${article.title}"\n` +
							`  Actual: "${trimmedTitle}"\n` +
							`  Page title: ${pageTitle}\n` +
							`  Similarity: ${(similarity * 100).toFixed(1)}%\n` +
							`  Debug: Check if the article title in the data matches the page content\n` +
							`  Suggestion: ${similarity > 0.8 ? 'Titles are similar - check for extra whitespace or special characters' : 'Titles are very different - verify the correct article is being loaded'}`
					);
				}

				// Success logging for debugging
				console.log(`✓ Blog route test passed: ${blogUrl} (${navigationTime}ms)`);
			} catch (error) {
				// Enhanced error categorization and reporting
				if (
					error.message.includes('CONTENT ERROR:') ||
					error.message.includes('VALIDATION ERROR:')
				) {
					// Re-throw our custom errors as-is (they already have detailed context)
					throw error;
				}

				// Handle navigation and network errors
				if (error.message.includes('net::') || error.message.includes('Navigation')) {
					throw new Error(
						`NAVIGATION ERROR: Failed to load blog route\n` +
							`  Route: ${blogUrl}\n` +
							`  Expected article: "${article.title}"\n` +
							`  Error type: Network/Navigation failure\n` +
							`  Debug: Check if the server is running and the route exists\n` +
							`  Original error: ${error.message}\n` +
							`  Test context: ${JSON.stringify(testContext, null, 2)}`
					);
				}

				// Handle timeout errors
				if (error.message.includes('Timeout') || error.message.includes('timeout')) {
					throw new Error(
						`TIMEOUT ERROR: Page load or element detection timed out\n` +
							`  Route: ${blogUrl}\n` +
							`  Expected article: "${article.title}"\n` +
							`  Debug: Page may be loading slowly or element selectors may be incorrect\n` +
							`  Suggestion: Check server performance and page rendering\n` +
							`  Original error: ${error.message}\n` +
							`  Test context: ${JSON.stringify(testContext, null, 2)}`
					);
				}

				// Handle all other unexpected errors
				throw new Error(
					`UNEXPECTED ERROR: Unknown failure during blog route test\n` +
						`  Route: ${blogUrl}\n` +
						`  Expected article: "${article.title}"\n` +
						`  Error type: ${error.constructor.name}\n` +
						`  Debug: This is an unexpected error - check test implementation\n` +
						`  Original error: ${error.message}\n` +
						`  Stack trace: ${error.stack}\n` +
						`  Test context: ${JSON.stringify(testContext, null, 2)}`
				);
			}
		});
	});
});
