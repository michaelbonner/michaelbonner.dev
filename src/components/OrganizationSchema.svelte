<script lang="ts">
	let {
		name = '',
		url = '',
		founder = {
			'@type': 'Person',
			name: 'Michael Bonner',
			url: 'https://michaelbonner.dev'
		}
	} = $props();

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: name,
		url: url,
		founder: founder
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
