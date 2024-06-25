<script lang="ts">
	import chromeBasecampUiExtension from '$lib/images/chrome-basecamp-ui-extension.webp?enhanced';
	import gitBranchNameGenerator3 from '$lib/images/git-branch-name-generator-3.webp?enhanced';
	import githubRepositoriesViewer from '$lib/images/github-repositories-viewer.webp?enhanced';
	import itermAliasesTrimmed600 from '$lib/images/iterm-aliases-trimmed-600.webp?enhanced';
	import tuffWebsiteScreenshotTrimmed600 from '$lib/images/tuff-website-screenshot-trimmed-600.webp?enhanced';
	import Seo from '../../components/Seo.svelte';
</script>

<Seo description="Just writing down some things" title="Developer Blog | Michael Bonner" />

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/blog" />
</svelte:head>

<main class="relative pt-8 pb-8 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
	<div class="container mx-auto px-8 py-12">
		<div class="prose dark:prose-invert max-w-3xl">
			<h1>Web Developer Blog</h1>
			<p>
				I&apos;m a full-time web developer, and I find things I want to write down, so I do from
				time to time.
			</p>
		</div>

		<div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 xl:grid-cols-3 lg:max-w-none">
			<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
				<a class="flex-shrink-0 leading-[0]" href="/blog/github-repositories-viewer-app">
					<enhanced:img
						class="h-48 w-full object-cover"
						src={githubRepositoriesViewer}
						alt="Github Repository Collaborators Viewer"
					/>
				</a>
				<div class="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
					<a href="/blog/github-repositories-viewer-app" class="block mt-2">
						<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
							Github Repository Collaborators Viewer
						</p>
						<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
							Check out the new Git Branch Name Raycast Extension I made
						</p>
					</a>
					<div class="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-200">
						<time dateTime="2023-09-147T16:00:00+00:00">2023-09-14</time>
						<span aria-hidden="true">&middot;</span>
						<span>2 minute read</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
				<a class="flex-shrink-0 leading-[0]" href="/blog/git-branch-name-raycast-extension">
					<enhanced:img
						class="h-48 w-full object-cover"
						src={gitBranchNameGenerator3}
						alt="Git Branch Name Raycast Extension"
					/>
				</a>
				<div class="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
					<a href="/blog/git-branch-name-raycast-extension" class="block mt-2">
						<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
							Git Branch Name Raycast Extension
						</p>
						<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
							Check out the new Git Branch Name Raycast Extension I made
						</p>
					</a>
					<div class="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-200">
						<time dateTime="2023-01-17T12:58:46.469Z">2023-01-17</time>
						<span aria-hidden="true">&middot;</span>
						<span>2 minute read</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
				<a class="flex-shrink-0 leading-[0]" href="/blog/i-made-an-extension">
					<enhanced:img
						class="h-48 w-full object-cover"
						src={chromeBasecampUiExtension}
						alt="I made my first Chrome extension"
					/>
				</a>
				<div class="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
					<a href="/blog/i-made-an-extension" class="block mt-2">
						<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
							I made my first Chrome extension
						</p>
						<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
							Really simple one, and it was really easy to make
						</p>
					</a>
					<div class="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-200">
						<time dateTime="2022-05-01T00:00:00+00:00">2022-05-01</time>
						<span aria-hidden="true">&middot;</span>
						<span>2 minute read</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
				<a
					class="flex-shrink-0 leading-[0]"
					href="/blog/getting-started-as-a-web-developer-in-2022"
				>
					<enhanced:img
						class="h-48 w-full object-cover"
						src={tuffWebsiteScreenshotTrimmed600}
						alt="Where I think new web software developers should start in 2022"
					/>
				</a>
				<div class="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
					<a href="/blog/getting-started-as-a-web-developer-in-2022" class="block mt-2">
						<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
							Where I think new web software developers should start in 2022
						</p>
						<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
							The guide I wish I had when getting started
						</p>
					</a>
					<div class="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-200">
						<time dateTime="2022-03-09T00:00:00+00:00">2022-03-09</time>
						<span aria-hidden="true">&middot;</span>
						<span>15 minute read</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
				<a class="flex-shrink-0 leading-[0]" href="/blog/set-up-some-aliases">
					<enhanced:img
						class="h-48 w-full object-cover"
						src={itermAliasesTrimmed600}
						alt="Set up some aliases"
					/>
				</a>
				<div class="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
					<a href="/blog/set-up-some-aliases" class="block mt-2">
						<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
							Set up some aliases
						</p>
						<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
							Just use them, they will change your life
						</p>
					</a>
					<div class="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-200">
						<time dateTime="2021-07-15T00:00:00+00:00">2021-07-15</time>
						<span aria-hidden="true">&middot;</span>
						<span>5 minute read</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
