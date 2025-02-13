<script lang="ts">
	import chromeBasecampUiExtension from '$lib/images/chrome-basecamp-ui-extension.jpg?enhanced&w=470';
	import gitBranchNameGenerator3 from '$lib/images/git-branch-name-generator-3.jpg?enhanced&w=470';
	import githubRepositoriesViewer from '$lib/images/github-repositories-viewer.jpg?enhanced&w=470';
	import itermAliasesTrimmed600 from '$lib/images/iterm-aliases-trimmed-600.jpg?enhanced&w=470';
	import tuffWebsiteScreenshotTrimmed600 from '$lib/images/tuff-website-screenshot-trimmed-600.jpg?enhanced&w=470';
	import Seo from '../../components/Seo.svelte';
	import { classes } from '../../styles/classes';

	import { blogArticles } from '$lib/data/blogArticles';
</script>

<Seo description="Just writing down some things" title="Developer Blog | Michael Bonner" />

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/blog" />
</svelte:head>

<main class="relative pt-8 pb-8 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
	<div class="container grid gap-12 py-12 px-8 mx-auto">
		<div class="max-w-3xl prose dark:prose-invert">
			<h1>Web Developer Blog</h1>
			<p>
				I&apos;m a full-time web developer, and I find things I want to write down, so I do from
				time to time.
			</p>
		</div>

		<div class="grid gap-5 mx-auto max-w-lg lg:grid-cols-2 lg:max-w-none xl:grid-cols-3">
			{#each blogArticles as article}
				<div
					class="flex overflow-hidden flex-col rounded-lg shadow-lg transition-transform hover:scale-105 hover:rotate-1"
				>
					<a aria-label={article.title} class="shrink-0 leading-0" href={`/blog/${article.slug}`}>
						<enhanced:img
							alt={article.title}
							class="object-cover w-full h-48"
							src={article.image}
						/>
					</a>
					<div class="grid flex-1 gap-y-4 p-6 bg-white dark:bg-gray-700">
						<a href={`/blog/${article.slug}`} class="block mt-2">
							<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
								{article.title}
							</p>
							<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
								{article.teaser}
							</p>
						</a>
						<div class="flex justify-end space-x-1 text-sm text-gray-500 dark:text-gray-200">
							<time dateTime={article.publishedAt.toISOString()}
								>{article.publishedAt.toLocaleDateString()}</time
							>
							<span aria-hidden="true">&middot;</span>
							<span>{article.readingTime}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div>
			I also wrote a <a class={classes.bodyLink} href="/ellie">post about my pup Ellie</a>, who died
			in 2023.
		</div>
	</div>
</main>
