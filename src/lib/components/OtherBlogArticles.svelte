<script lang="ts">
	import { page } from '$app/state';
	import { blogArticles } from '$lib/data/blogArticles';
	import { classNames } from '../../functions/classNames';
	import { classes } from '../../styles/classes';

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

	const groups = $derived(
		[
			{ heading: 'Related articles', articles: articleGroups.relatedArticles },
			{ heading: 'More writing', articles: articleGroups.otherArticles }
		].filter((group) => group.articles.length > 0)
	);
</script>

<!--
	Post footer navigation. Titles are links in a ruled list rather than bulleted
	body copy, so the reader can scan them without them competing with the article.
-->
{#if groups.length > 0}
	<aside class="border-rule bg-ground-sunken mt-20 border-t">
		<div class="container mx-auto grid gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16">
			{#each groups as group (group.heading)}
				<div class="grid content-start gap-5">
					<h2 class={classes.eyebrow}>{group.heading}</h2>
					<ul class="border-rule grid border-t">
						{#each group.articles as article (article.slug)}
							<li class="border-rule border-b">
								<a
									class="group flex flex-col gap-1 py-3.5 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
									href={`/blog/${article.slug}`}
								>
									<span
										class="text-ink group-hover:text-accent font-serif text-[1.0625rem] font-medium transition-colors duration-150 ease-out"
									>
										{article.title}
									</span>
									<span class={classNames(classes.label, 'shrink-0 tabular-nums')}>
										{article.readingTime}
									</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</aside>
{/if}
