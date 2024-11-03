<script lang="ts">
	interface Props {
		title?: string;
		description?: string;
		ogImage?: string;
		ogType?: string;
	}

	let {
		title = '',
		description = '',
		ogImage = 'https://michaelbonner.dev/og-image.jpg',
		ogType = 'website'
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={ogType} />
</svelte:head>
