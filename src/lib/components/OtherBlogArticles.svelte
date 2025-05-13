<script>
	import { page } from '$app/state';
	import { blogArticles } from '$lib/data/blogArticles';
	import clsx from 'clsx';
	import H2 from '../../components/H2.svelte';
	import { classes } from '../../styles/classes';

	const slug = (page.route.id ?? '').split('/').pop();
	const otherArticles = blogArticles.filter((article) => article.slug !== slug);
</script>

<aside class="container py-12 px-8 mx-auto">
	<H2>Other Articles</H2>
	<ul class="list-disc list-outside ml-12 mt-4">
		{#each otherArticles as article (article.slug)}
			<li class="py-1">
				<a class={clsx(classes.bodyLink, 'w-full md:w-auto')} href={`/blog/${article.slug}`}>
					{article.title}
				</a>
			</li>
		{/each}
	</ul>
</aside>
