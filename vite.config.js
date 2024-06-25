import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [enhancedImages(), sveltekit()],
	optimizeDeps: {
		include: ['highlight.js', 'highlight.js/lib/core']
	}
};

export default config;
