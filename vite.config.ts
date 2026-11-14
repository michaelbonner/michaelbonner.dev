import adapter from '@sveltejs/adapter-cloudflare';
import { partytownVite } from '@qwik.dev/partytown/utils';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	plugins: [
		tailwindcss(),
		enhancedImages(),
		sveltekit({
			adapter: adapter({
				// Playwright sets E2E (see playwright.config.ts) so `vite preview` runs
				// against local-only bindings instead of the remote D1 database.
				platformProxy: process.env.E2E
					? { configPath: 'wrangler.test.jsonc', persist: false }
					: undefined
			})
		}),
		partytownVite({}),
		devtoolsJson()
	]
});
