<script lang="ts">
	import { page } from '$app/state';
	import OtherBlogArticles from '$lib/components/OtherBlogArticles.svelte';
</script>

<main>
	<slot />

	{#if page.route.id !== '/blog'}
		<OtherBlogArticles />
	{/if}
</main>
