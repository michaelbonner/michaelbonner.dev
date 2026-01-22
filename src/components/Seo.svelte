<script lang="ts">
	let {
		title = '',
		description = '',
		ogImage = 'https://michaelbonner.dev/og-image.jpg',
		ogType = 'website'
	} = $props();

	const getOgImageWithHost = (ogImage: string) => {
		if (ogImage.startsWith('http')) {
			return ogImage;
		}

		if (import.meta.env.VERCEL_TARGET_ENV === 'preview') {
			return `https://${import.meta.env.VERCEL_URL}${ogImage}`;
		}

		if (import.meta.env.MODE === 'development') {
			return `http://localhost:5173${ogImage}`;
		}

		// Default to production
		return `https://michaelbonner.dev${ogImage}`;
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="Michael Bonner" />
	<meta property="og:image" content={getOgImageWithHost(ogImage)} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={ogType} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={getOgImageWithHost(ogImage)} />
</svelte:head>
