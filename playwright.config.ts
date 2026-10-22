import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'bun run build && bun run preview',
		port: 4173,
		// A cold build spends most of its time resizing `?enhanced` images, and on a
		// GitHub runner that alone has taken anywhere from three to five minutes.
		timeout: 10 * 60 * 1000 // 10 minutes
	},
	testDir: 'e2e',
	outputDir: 'playwright-report',
	use: { baseURL: 'http://localhost:4173' }
});
