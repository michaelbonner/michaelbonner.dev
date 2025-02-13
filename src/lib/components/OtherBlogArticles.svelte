<script>
	export let slug;

	import { blogArticles } from '$lib/data/blogArticles';
	import H2 from '../../components/H2.svelte';
	import { classes } from '../../styles/classes';

	const otherArticles = blogArticles.filter((article) => article.slug !== slug);
</script>

<aside class="container py-12 px-8 mx-auto">
	<H2>Other Articles</H2>
	<ul class="list-disc list-outside ml-12 mt-4">
		{#each otherArticles as article}
			<li class="py-1">
				<a class={classes.bodyLink} href={`/blog/${article.slug}`}>
					{article.title}
				</a>
			</li>
		{/each}
	</ul>
</aside>
