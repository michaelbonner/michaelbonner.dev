<script lang="ts">
	import { blogArticles } from '$lib/data/blogArticles';
	import Seo from '../../components/Seo.svelte';
	import { classes } from '../../styles/classes';
</script>

<Seo
	description="A web developer's blog from Salt Lake City, UT. Thoughts on development, technology, and random things worth writing about."
	title="Developer Blog | Michael Bonner"
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/blog" />
</svelte:head>

<div class="relative pt-8 pb-8 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
	<div class="container mx-auto grid gap-12 px-8 py-12">
		<div class="prose dark:prose-invert max-w-3xl">
			<h1>Web Developer Blog</h1>
			<p>
				I&apos;m a full-time web developer, and I find things I want to write down, so I do from
				time to time.
			</p>
		</div>

		<div class="mx-auto grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
			{#each blogArticles as article (article.slug)}
				<div
					class="flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 hover:rotate-1"
				>
					<a aria-label={article.title} class="shrink-0 leading-0" href={`/blog/${article.slug}`}>
						<enhanced:img
							alt={article.title}
							class="h-48 w-full object-cover"
							src={article.image}
						/>
					</a>
					<div class="grid flex-1 gap-y-4 bg-white p-6 dark:bg-gray-700">
						<a href={`/blog/${article.slug}`} class="mt-2 block">
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
</div>
