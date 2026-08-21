/**
 * Every page that gets a custom Open Graph image.
 *
 * `name` becomes `static/og/<name>.jpg`, which the page passes to <Seo ogImage="/og/<name>.jpg" />.
 * `image` is optional; when present it fills the right side of the card.
 */
export const cards = [
	{
		name: 'default',
		route: '(fallback)',
		eyebrow: 'michaelbonner.dev',
		title: "Hi! I'm Michael Bonner",
		description: 'A web developer in Salt Lake City, Utah.',
		image: 'src/lib/images/on-the-beach.jpg',
		imageFocus: 'left'
	},
	{
		name: 'home',
		route: '/',
		eyebrow: 'Web Developer · Salt Lake City, Utah',
		title: "Hi! I'm Michael Bonner",
		description:
			'I specialize in business efficiency applications, APIs, and integrations. Almost 20 years of building for the web.',
		image: 'src/lib/images/on-the-beach.jpg',
		imageFocus: 'left'
	},
	{
		name: 'blog',
		route: '/blog',
		eyebrow: 'Blog',
		title: 'Web Developer Blog',
		description:
			'Thoughts on development, technology, and random things worth writing down from time to time.'
	},
	{
		name: 'contact',
		route: '/contact',
		eyebrow: 'Contact',
		title: 'Get In Touch',
		description:
			'Have a project, a question, or just want to say hi? Send a note and I’ll get back to you.'
	},
	{
		name: 'uses',
		route: '/uses',
		eyebrow: 'Uses',
		title: 'Software and other things I recommend',
		description:
			'The hardware, editors, and tools I reach for every day to build products for clients.'
	},
	{
		name: 'patents',
		route: '/patents',
		eyebrow: 'Patents',
		title: 'Patents by Michael Bonner',
		description:
			'Patents listing me as inventor, covering data management systems and construction project management technology.'
	},
	{
		name: 'restaurants',
		route: '/restaurants',
		eyebrow: 'Salt Lake City',
		title: 'Favorite Restaurants in Salt Lake',
		description: 'A sortable, filterable, mapped list of the places I keep going back to.',
		image: 'src/lib/images/restaurants/Settebello.jpg'
	},
	{
		name: 'ellie',
		route: '/ellie',
		eyebrow: 'In Memory',
		title: 'Some of my favorite memories with Ellie',
		description: 'The best dog. 2013 – 2023.',
		image: 'src/lib/images/ellie/main.jpg',
		imageFocus: 'top'
	},
	{
		name: 'policies',
		route: '/policies',
		eyebrow: 'Policies',
		title: 'Privacy Policy and Terms of Service',
		description: "How this site handles your data, and the terms that go with using it."
	},
	{
		name: 'mothers-day-2023',
		route: '/mothers-day-2023',
		eyebrow: 'For Mom',
		title: "Happy Mother's Day Mom!",
		description:
			'I wanted to take a moment to let you know just how much I appreciate and love you.'
	},

	// Blog posts
	{
		name: 'blog-screenshot-maker',
		route: '/blog/screenshot-maker',
		eyebrow: 'Blog',
		title: 'Screenshot Maker',
		description: 'A tool to make screenshots of websites. Dang simple and serverless ready.',
		meta: 'May 14, 2025 · 2 minute read',
		image: 'src/lib/images/projects/screenshot-maker.webp',
		imageStyle: 'thumb'
	},
	{
		name: 'blog-pagespeed-testing',
		route: '/blog/pagespeed-testing',
		eyebrow: 'Blog',
		title: 'PageSpeed Testing Tool for Developers',
		description: 'I made a little tool to test the performance of every page on a site at once.',
		meta: 'April 9, 2025 · 2 minute read',
		image: 'src/lib/images/projects/pagespeed.jpg',
		imageStyle: 'thumb'
	},
	{
		name: 'blog-github-repositories-viewer-app',
		route: '/blog/github-repositories-viewer-app',
		eyebrow: 'Blog',
		title: 'GitHub Repository Collaborators Viewer',
		description:
			'A simple app to see who has access to which of your GitHub repositories, all in one place.',
		meta: 'September 14, 2023 · 2 minute read',
		image: 'src/lib/images/github-repositories-viewer.jpg',
		imageStyle: 'thumb'
	},
	{
		name: 'blog-git-branch-name-raycast-extension',
		route: '/blog/git-branch-name-raycast-extension',
		eyebrow: 'Blog',
		title: 'Git Branch Name Generator: Raycast Extension',
		description: 'Paste in a to-do, get a tidy branch name back. Right from Raycast.',
		meta: 'January 17, 2023 · 2 minute read',
		image: 'src/lib/images/git-branch-name-generator-3.jpg',
		imageStyle: 'thumb'
	},
	{
		name: 'blog-i-made-an-extension',
		route: '/blog/i-made-an-extension',
		eyebrow: 'Blog',
		title: 'Building a Chrome Extension: Basecamp UI Tweaks',
		description: 'Really simple one, and it was really easy to make.',
		meta: 'May 1, 2022 · 2 minute read',
		image: 'src/lib/images/chrome-basecamp-ui-extension.jpg',
		imageStyle: 'thumb'
	},
	{
		name: 'blog-getting-started-as-a-web-developer-in-2022',
		route: '/blog/getting-started-as-a-web-developer-in-2022',
		eyebrow: 'Blog',
		title: 'Getting Started as a Web Developer in 2022',
		description:
			'Learn the absolute basics, then build as much as you can. My two cents after almost 20 years.',
		meta: 'March 8, 2022 · 15 minute read',
		image: 'src/lib/images/tuff-website-screenshot-trimmed-600.jpg',
		imageStyle: 'thumb'
	},
	{
		name: 'blog-set-up-some-aliases',
		route: '/blog/set-up-some-aliases',
		eyebrow: 'Blog',
		title: 'Set Up Bash Aliases to Speed Up Development',
		description: 'Just use them, they will change your life.',
		meta: 'July 15, 2021 · 5 minute read',
		image: 'src/lib/images/iterm-aliases-trimmed-600.jpg',
		imageStyle: 'thumb'
	}
];
