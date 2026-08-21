<script lang="ts">
	interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	let { items = [] as BreadcrumbItem[] } = $props();

	const baseUrl = 'https://michaelbonner.dev';

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.label,
			...(item.href ? { item: `${baseUrl}${item.href}` } : {})
		}))
	});
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<${'script'} type="application/ld+json">${JSON.stringify(schema)}</${'script'}>`}
</svelte:head>

<nav aria-label="Breadcrumb" class="mx-auto max-w-[90rem] px-5 py-4 font-sans sm:px-8 lg:px-12">
	<ol class="text-ink-soft flex items-center gap-2 text-base sm:text-sm">
		{#each items as item, index (item.label)}
			<li class="flex items-center gap-2">
				{#if index > 0}
					<span aria-hidden="true">/</span>
				{/if}
				{#if item.href}
					<a href={item.href} class="hover:text-tomato underline underline-offset-4">
						{item.label}
					</a>
				{:else}
					<span class="text-ink font-medium">
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
