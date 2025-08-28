#!/usr/bin/env node

/**
 * Validation script to ensure test data stays synchronized with actual blog routes
 * This script can be run manually or as part of CI to verify test coverage
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function validateTestData() {
	console.log('🔍 Validating blog test data synchronization...\n');

	try {
		// Get all blog route directories
		const blogRoutesPath = join(process.cwd(), 'src/routes/blog');
		const entries = await readdir(blogRoutesPath, { withFileTypes: true });
		const actualSlugs = entries
			.filter((entry) => entry.isDirectory())
			.map((entry) => entry.name)
			.sort();

		// Read test data file and extract slugs
		const testDataPath = join(process.cwd(), 'e2e/test-data/blog-articles.ts');
		const testDataContent = await readFile(testDataPath, 'utf-8');

		// Extract slugs using regex
		const slugMatches = testDataContent.match(/slug:\s*['"`]([^'"`]+)['"`]/g) || [];
		const testDataSlugs = slugMatches
			.map((match) => match.match(/slug:\s*['"`]([^'"`]+)['"`]/)[1])
			.sort();

		console.log(`📁 Found ${actualSlugs.length} blog route directories:`);
		actualSlugs.forEach((slug) => console.log(`   - ${slug}`));

		console.log(`\n📋 Found ${testDataSlugs.length} articles in test data:`);
		testDataSlugs.forEach((slug) => console.log(`   - ${slug}`));

		// Check for missing routes in test data
		const missingInTestData = actualSlugs.filter((slug) => !testDataSlugs.includes(slug));
		if (missingInTestData.length > 0) {
			console.log(`\n❌ Missing in test data:`);
			missingInTestData.forEach((slug) => console.log(`   - ${slug}`));
		}

		// Check for extra routes in test data
		const extraInTestData = testDataSlugs.filter((slug) => !actualSlugs.includes(slug));
		if (extraInTestData.length > 0) {
			console.log(`\n⚠️  Extra in test data (routes don't exist):`);
			extraInTestData.forEach((slug) => console.log(`   - ${slug}`));
		}

		// Summary
		if (missingInTestData.length === 0 && extraInTestData.length === 0) {
			console.log(`\n✅ Test data is perfectly synchronized!`);
			console.log(
				`   ${actualSlugs.length} blog routes are covered by ${testDataSlugs.length} test cases.`
			);
			return true;
		} else {
			console.log(`\n❌ Test data synchronization issues found:`);
			console.log(`   - Missing routes: ${missingInTestData.length}`);
			console.log(`   - Extra routes: ${extraInTestData.length}`);
			return false;
		}
	} catch (error) {
		console.error('❌ Error validating test data:', error.message);
		return false;
	}
}

/**
 * Updates the test data file with current blog articles data
 * Extracts only slug and title (or h1 if available) from blogArticles.ts
 */
async function updateTestData() {
	console.log('🔄 Updating blog test data from source...\n');

	try {
		// Read the source blog articles file
		const blogArticlesPath = join(process.cwd(), 'src/lib/data/blogArticles.ts');
		const blogArticlesContent = await readFile(blogArticlesPath, 'utf-8');

		// Extract the blogArticles array using regex
		const arrayMatch = blogArticlesContent.match(/export const blogArticles = \[([\s\S]*?)\];/);
		if (!arrayMatch) {
			throw new Error('Could not find blogArticles array in source file');
		}

		// Parse each article object to extract slug and title/h1
		const articleObjects = [];
		const objectRegex = /\{([\s\S]*?)\}/g;
		let match;

		while ((match = objectRegex.exec(arrayMatch[1])) !== null) {
			const objectContent = match[1];

			// Extract slug
			const slugMatch = objectContent.match(/slug:\s*['"`]([^'"`]+)['"`]/);
			if (!slugMatch) continue;

			const slug = slugMatch[1];

			// Extract h1 first, then title if h1 doesn't exist
			const h1Match = objectContent.match(/h1:\s*['"`]([^'"`]+)['"`]/);
			const titleMatch = objectContent.match(/title:\s*['"`]([^'"`]+)['"`]/);

			const title = h1Match ? h1Match[1] : titleMatch ? titleMatch[1] : '';

			if (title) {
				articleObjects.push({ title, slug });
			}
		}

		// Generate the new test data file content
		const testDataContent = `// Generated file, do not edit directly
// Test-friendly version of blog articles data
// This file extracts only the necessary data for testing without SvelteKit-specific imports

export const blogArticlesTestData = [
${articleObjects
	.map(
		(article) => `\t{
\t\ttitle: '${article.title.replace(/'/g, "\\'")}',
\t\tslug: '${article.slug}'
\t}`
	)
	.join(',\n')}
];
`;

		// Write the updated test data file
		const testDataPath = join(process.cwd(), 'e2e/test-data/blog-articles.ts');
		await writeFile(testDataPath, testDataContent, 'utf-8');

		console.log(`✅ Successfully updated test data with ${articleObjects.length} articles:`);
		articleObjects.forEach((article) => console.log(`   - ${article.slug}: "${article.title}"`));

		return true;
	} catch (error) {
		console.error('❌ Error updating test data:', error.message);
		return false;
	}
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const shouldUpdate = process.argv.includes('--update');

	if (shouldUpdate) {
		const updateSuccess = await updateTestData();
		if (!updateSuccess) {
			process.exit(1);
		}
	}

	const isValid = await validateTestData();
	process.exit(isValid ? 0 : 1);
}

export { updateTestData, validateTestData };
