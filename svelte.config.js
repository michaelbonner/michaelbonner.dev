import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			platformProxy: process.env.CI
				? { configPath: 'wrangler.test.jsonc', persist: false }
				: undefined
		})
	},

	plugins: []
};

export default config;
