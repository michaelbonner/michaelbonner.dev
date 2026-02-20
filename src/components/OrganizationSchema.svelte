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

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: name,
		url: url,
		founder: founder
	});
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<${'script'} type="application/ld+json">${JSON.stringify(schema)}</${'script'}>`}
</svelte:head>
