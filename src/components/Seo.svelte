<script lang="ts">
	let {
		title = '',
		description = '',
		ogImage = 'https://michaelbonner.dev/og-image.jpg',
		ogType = 'website'
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={ogType} />
</svelte:head>
