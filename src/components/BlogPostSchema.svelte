<script lang="ts">
	import { env } from '$env/dynamic/public';

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

		if (import.meta.env.MODE === 'development') {
			return `http://localhost:5173${image}`;
		}

		return `${env.PUBLIC_SITE_URL || 'https://michaelbonner.dev'}${image}`;
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
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<${'script'} type="application/ld+json">${JSON.stringify(schema)}</${'script'}>`}
</svelte:head>
