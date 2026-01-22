<script lang="ts">
	let {
		name = 'Michael Bonner',
		url = 'https://michaelbonner.dev',
		jobTitle = 'Web Developer',
		description = '',
		image = 'https://michaelbonner.dev/og-image.jpg',
		sameAs = [] as string[]
	} = $props();

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: name,
		url: url,
		jobTitle: jobTitle,
		description: description,
		image: image,
		sameAs: sameAs
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
