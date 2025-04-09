<script lang="ts">
	import { page } from '$app/state';
	import OtherBlogArticles from '$lib/components/OtherBlogArticles.svelte';

	const slug = (page.route.id ?? '').split('/').pop();
</script>

<main>
	<slot />

	<OtherBlogArticles />
</main>
