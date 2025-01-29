import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [tailwindcss(), enhancedImages(), sveltekit()],
	optimizeDeps: {
		include: ['highlight.js', 'highlight.js/lib/core']
	}
};

export default config;
