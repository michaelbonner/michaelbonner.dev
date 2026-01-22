<script lang="ts">
	import { page } from '$app/state';
	import { blogArticles } from '$lib/data/blogArticles';
	import Breadcrumbs from '../../components/Breadcrumbs.svelte';
	import OtherBlogArticles from '$lib/components/OtherBlogArticles.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	let { children }: Props = $props();

	let breadcrumbItems = $derived.by(() => {
		const items: BreadcrumbItem[] = [
			{ label: 'Home', href: '/' },
			{ label: 'Blog', href: '/blog' }
		];

		if (page.route.id !== '/blog') {
			const slug = (page.route.id ?? '').split('/').pop();
			const article = blogArticles.find((a) => a.slug === slug);
			if (article) {
				items.push({ label: article.title });
			}
		}

		return items;
	});
</script>

<div>
	{#if page.route.id !== '/blog'}
		<Breadcrumbs items={breadcrumbItems} />
	{/if}

	{@render children?.()}

	{#if page.route.id !== '/blog'}
		<OtherBlogArticles />
	{/if}
</div>
