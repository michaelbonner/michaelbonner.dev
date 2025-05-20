<script lang="ts">
	import { page } from '$app/state';
	import OtherBlogArticles from '$lib/components/OtherBlogArticles.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<main>
	{@render children?.()}

	{#if page.route.id !== '/blog'}
		<OtherBlogArticles />
	{/if}
</main>
