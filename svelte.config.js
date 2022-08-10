import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { imagePreprocessor } from 'svimg';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		imagePreprocessor({
			inputDir: 'static',
			outputDir: 'static/g',
			webp: true,
			avif: true
		}),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
