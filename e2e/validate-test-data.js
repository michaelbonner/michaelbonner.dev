#!/usr/bin/env node

/**
 * Validation script to ensure test data stays synchronized with actual blog routes
 * This script can be run manually or as part of CI to verify test coverage
 */

import { readdir, readFile } from 'fs/promises';
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

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	const isValid = await validateTestData();
	process.exit(isValid ? 0 : 1);
}

export { validateTestData };
