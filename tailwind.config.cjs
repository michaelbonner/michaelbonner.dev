/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Graphik', 'sans-serif'],
			serif: ['Newsreader', 'serif']
		},
		extend: {}
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')]
};
