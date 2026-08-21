<script>
	import { page } from '$app/state';
	import { blogArticles } from '$lib/data/blogArticles';

	// Compute related and other articles when page.route.id changes
	let articleGroups = $derived.by(() => {
		const slug = (page.route.id ?? '').split('/').pop();
		const currentArticle = blogArticles.find((article) => article.slug === slug);

		const relatedSlugs = currentArticle?.relatedSlugs || [];
		const relatedArticles = blogArticles.filter((article) => relatedSlugs.includes(article.slug));

		const otherArticles = blogArticles.filter(
			(article) => article.slug !== slug && !relatedSlugs.includes(article.slug)
		);

		return { relatedArticles, otherArticles };
	});
</script>

<aside class="bg-ink text-cream mt-16 py-16 font-sans sm:py-20">
	<div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
		{#if articleGroups.relatedArticles.length > 0}
			<h2 class="max-w-[18ch] text-4xl font-medium tracking-tight text-balance sm:text-5xl">
				Related articles
			</h2>
			<ul class="border-cream/20 divide-cream/15 mt-6 divide-y border-y" role="list">
				{#each articleGroups.relatedArticles as article (article.slug)}
					<li>
						<a
							class="hover:text-butter flex min-h-14 items-center py-3 text-lg"
							href={`/blog/${article.slug}`}
						>
							{article.title}
						</a>
					</li>
				{/each}
			</ul>
		{/if}

		{#if articleGroups.otherArticles.length > 0}
			<div class:mt-12={articleGroups.relatedArticles.length > 0}>
				<h2 class="max-w-[18ch] text-4xl font-medium tracking-tight text-balance sm:text-5xl">
					More from the blog
				</h2>
				<ul
					class="border-cream/20 divide-cream/15 mt-6 grid divide-y border-y lg:grid-cols-2 lg:gap-x-12 lg:divide-y-0"
					role="list"
				>
					{#each articleGroups.otherArticles as article (article.slug)}
						<li class="border-cream/15 border-b lg:nth-[1]:border-t lg:nth-[2]:border-t">
							<a
								class="hover:text-butter flex min-h-14 items-center py-3"
								href={`/blog/${article.slug}`}
							>
								{article.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</aside>
