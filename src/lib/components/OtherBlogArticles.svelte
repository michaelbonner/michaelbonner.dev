<script>
	import { page } from '$app/state';
	import { blogArticles } from '$lib/data/blogArticles';
	import clsx from 'clsx';
	import H2 from '../../components/H2.svelte';
	import { classes } from '../../styles/classes';

	// Compute related and other articles when page.route.id changes
	let articleGroups = $derived.by(() => {
		const slug = (page.route.id ?? '').split('/').pop();
		const currentArticle = blogArticles.find((article) => article.slug === slug);

		const relatedSlugs = currentArticle?.relatedSlugs || [];
		const relatedArticles = blogArticles.filter((article) =>
			relatedSlugs.includes(article.slug)
		);

		const otherArticles = blogArticles.filter((article) =>
			article.slug !== slug && !relatedSlugs.includes(article.slug)
		);

		return { relatedArticles, otherArticles };
	});
</script>

<aside class="container mx-auto px-8 py-12">
	{#if articleGroups.relatedArticles.length > 0}
		<H2>Related Articles</H2>
		<ul class="mt-4 ml-12 list-outside list-disc">
			{#each articleGroups.relatedArticles as article (article.slug)}
				<li class="py-1">
					<a class={clsx(classes.bodyLink, 'w-full md:w-auto')} href={`/blog/${article.slug}`}>
						{article.title}
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	{#if articleGroups.otherArticles.length > 0}
		<div class:mt-8={articleGroups.relatedArticles.length > 0}>
			<H2>Other Articles</H2>
			<ul class="mt-4 ml-12 list-outside list-disc">
				{#each articleGroups.otherArticles as article (article.slug)}
					<li class="py-1">
						<a class={clsx(classes.bodyLink, 'w-full md:w-auto')} href={`/blog/${article.slug}`}>
							{article.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</aside>
