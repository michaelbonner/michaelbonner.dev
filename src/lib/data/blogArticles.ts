import chromeBasecampUiExtension from '$lib/images/chrome-basecamp-ui-extension.jpg?enhanced&w=470';
import gitBranchNameGenerator3 from '$lib/images/git-branch-name-generator-3.jpg?enhanced&w=470';
import githubRepositoriesViewer from '$lib/images/github-repositories-viewer.jpg?enhanced&w=470';
import itermAliasesTrimmed600 from '$lib/images/iterm-aliases-trimmed-600.jpg?enhanced&w=470';
import pagespeed from '$lib/images/projects/pagespeed.jpg?enhanced&w=470';
import screenshotMaker from '$lib/images/projects/screenshot-maker.webp?enhanced&w=470';
import tuffWebsiteScreenshotTrimmed600 from '$lib/images/tuff-website-screenshot-trimmed-600.jpg?enhanced&w=470';

export const blogArticles = [
	{
		title: 'Screenshot Maker',
		slug: 'screenshot-maker',
		teaser: 'A tool to make screenshots of websites. Dang simple and serverless ready',
		publishedAt: new Date('2025-05-14T16:46:00.845Z'),
		readingTime: '2 minute read',
		image: screenshotMaker
	},
	{
		title: 'PageSpeed Testing is important, you should take it seriously',
		slug: 'pagespeed-testing',
		teaser: 'I made a little tool to test the performance of pages on a site on one page',
		publishedAt: new Date('2025-04-09T16:00:00.000Z'),
		readingTime: '2 minute read',
		image: pagespeed
	},
	{
		title: 'Github Repository Collaborators Viewer',
		slug: 'github-repositories-viewer-app',
		teaser: 'A simple app to view Github repository collaborators across all your repositories',
		publishedAt: new Date('2023-09-14T16:00:00.000Z'),
		readingTime: '2 minute read',
		image: githubRepositoriesViewer
	},
	{
		title: 'Git Branch Name Generator Raycast Extension',
		slug: 'git-branch-name-raycast-extension',
		teaser: 'Check out the new Git Branch Name Raycast Extension I made',
		publishedAt: new Date('2023-01-17T12:58:46.469Z'),
		readingTime: '2 minute read',
		image: gitBranchNameGenerator3
	},
	{
		title: 'I made my first Chrome extension',
		slug: 'i-made-an-extension',
		teaser: 'A Chrome extension to make Basecamp a little more usable',
		publishedAt: new Date('2022-05-01T12:00:00.000Z'),
		readingTime: '2 minute read',
		image: chromeBasecampUiExtension
	},
	{
		title: 'Where I think new web software developers should start in 2022',
		slug: 'getting-started-as-a-web-developer-in-2022',
		teaser: 'A (hopefully) helpful guide for getting started as a web software developer',
		publishedAt: new Date('2022-03-09T12:00:00.000Z'),
		readingTime: '15 minute read',
		image: tuffWebsiteScreenshotTrimmed600
	},
	{
		title: 'Set up some aliases',
		slug: 'set-up-some-aliases',
		teaser: 'Just use them, they will change your life',
		publishedAt: new Date('2021-07-15T12:00:00.000Z'),
		readingTime: '5 minute read',
		image: itermAliasesTrimmed600
	}
];
