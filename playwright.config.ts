import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'bun run build && bun run preview',
		port: 4173,
		timeout: 5 * 60 * 1000 // 5 minutes
	},
	testDir: 'e2e',
	outputDir: 'playwright-report',
	use: { baseURL: 'http://localhost:4173' }
});
