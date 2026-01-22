import chromeBasecampUiExtension from '$lib/images/chrome-basecamp-ui-extension.jpg?enhanced';
import gitBranchNameGenerator3 from '$lib/images/git-branch-name-generator-3.jpg?enhanced';
import githubRepositoriesViewer from '$lib/images/github-repositories-viewer.jpg?enhanced';
import itermAliasesTrimmed600 from '$lib/images/iterm-aliases-trimmed-600.jpg?enhanced';
import pagespeed from '$lib/images/projects/pagespeed.jpg?enhanced';
import screenshotMaker from '$lib/images/projects/screenshot-maker.webp?enhanced';
import tuffWebsiteScreenshotTrimmed600 from '$lib/images/tuff-website-screenshot-trimmed-600.jpg?enhanced';

export const blogArticles = [
	{
		title: 'Screenshot Maker',
		slug: 'screenshot-maker',
		teaser: 'A tool to make screenshots of websites. Dang simple and serverless ready',
		publishedAt: new Date('2025-05-14T16:46:00.845Z'),
		readingTime: '2 minute read',
		image: screenshotMaker,
		tags: ['tools', 'projects', 'serverless'],
		relatedSlugs: ['pagespeed-testing']
	},
	{
		title: 'PageSpeed Testing Tool for Developers',
		slug: 'pagespeed-testing',
		teaser: 'I made a little tool to test the performance of pages on a site on one page',
		publishedAt: new Date('2025-04-09T16:00:00.000Z'),
		readingTime: '2 minute read',
		image: pagespeed,
		tags: ['tools', 'projects', 'performance'],
		relatedSlugs: ['screenshot-maker']
	},
	{
		title: 'GitHub Repository Collaborators Viewer',
		slug: 'github-repositories-viewer-app',
		teaser: 'A simple app to view GitHub repository collaborators across all your repositories',
		publishedAt: new Date('2023-09-14T16:00:00.000Z'),
		readingTime: '2 minute read',
		image: githubRepositoriesViewer,
		tags: ['tools', 'projects', 'github'],
		relatedSlugs: ['git-branch-name-raycast-extension']
	},
	{
		title: 'Git Branch Name Generator: Raycast Extension',
		slug: 'git-branch-name-raycast-extension',
		teaser: 'Check out the new Git Branch Name Raycast Extension I made',
		publishedAt: new Date('2023-01-17T12:58:46.469Z'),
		readingTime: '2 minute read',
		image: gitBranchNameGenerator3,
		tags: ['tools', 'extensions', 'git'],
		relatedSlugs: ['github-repositories-viewer-app', 'set-up-some-aliases']
	},
	{
		title: 'Building a Chrome Extension: Basecamp UI Tweaks',
		slug: 'i-made-an-extension',
		teaser: 'A Chrome extension to make Basecamp a little more usable',
		publishedAt: new Date('2022-05-01T12:00:00.000Z'),
		readingTime: '2 minute read',
		image: chromeBasecampUiExtension,
		tags: ['extensions', 'chrome', 'projects'],
		relatedSlugs: ['git-branch-name-raycast-extension']
	},
	{
		title: 'Getting Started as a Web Developer in 2022',
		slug: 'getting-started-as-a-web-developer-in-2022',
		teaser: 'A (hopefully) helpful guide for getting started as a web software developer',
		publishedAt: new Date('2022-03-09T12:00:00.000Z'),
		readingTime: '15 minute read',
		image: tuffWebsiteScreenshotTrimmed600,
		tags: ['career', 'learning', 'beginners'],
		relatedSlugs: ['set-up-some-aliases']
	},
	{
		title: 'Set Up Bash Aliases to Speed Up Development',
		slug: 'set-up-some-aliases',
		teaser: 'Just use them, they will change your life',
		publishedAt: new Date('2021-07-15T12:00:00.000Z'),
		readingTime: '5 minute read',
		image: itermAliasesTrimmed600,
		tags: ['productivity', 'tools', 'terminal'],
		relatedSlugs: ['git-branch-name-raycast-extension', 'getting-started-as-a-web-developer-in-2022']
	}
];
