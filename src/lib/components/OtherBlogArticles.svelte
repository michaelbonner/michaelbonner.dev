<script>
	import { page } from '$app/state';
	import { blogArticles } from '$lib/data/blogArticles';
	import clsx from 'clsx';
	import H2 from '../../components/H2.svelte';
	import { classes } from '../../styles/classes';

	// update the other articles when the page.route.id changes
	let otherArticles = $derived.by(() => {
		const slug = (page.route.id ?? '').split('/').pop();

		return blogArticles.filter((article) => article.slug !== slug);
	});
</script>

<aside class="container mx-auto px-8 py-12">
	<H2>Other Articles</H2>
	<ul class="mt-4 ml-12 list-outside list-disc">
		{#each otherArticles as article (article.slug)}
			<li class="py-1">
				<a class={clsx(classes.bodyLink, 'w-full md:w-auto')} href={`/blog/${article.slug}`}>
					{article.title}
				</a>
			</li>
		{/each}
	</ul>
</aside>
