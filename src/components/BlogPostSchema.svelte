<script lang="ts">
	let {
		title = '',
		description = '',
		url = '',
		datePublished = '',
		dateModified = '',
		image = '',
		author = {
			'@type': 'Person',
			name: 'Michael Bonner',
			url: 'https://michaelbonner.dev'
		}
	} = $props();

	const getImageWithHost = (image: string) => {
		if (image.startsWith('http')) {
			return image;
		}

		if (import.meta.env.VERCEL_TARGET_ENV === 'preview') {
			return `https://${import.meta.env.VERCEL_URL}${image}`;
		}

		if (import.meta.env.MODE === 'development') {
			return `http://localhost:5173${image}`;
		}

		return `https://michaelbonner.dev${image}`;
	};

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description: description,
		url: url,
		datePublished: datePublished,
		dateModified: dateModified || datePublished,
		author: author,
		image: getImageWithHost(image),
		publisher: {
			'@type': 'Person',
			name: 'Michael Bonner',
			url: 'https://michaelbonner.dev'
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url
		}
	});
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
