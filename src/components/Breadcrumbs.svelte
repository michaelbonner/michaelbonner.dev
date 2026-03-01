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

<nav aria-label="Breadcrumb" class="container mx-auto px-8 py-4">
	<ol class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
		{#each items as item, index (item.label)}
			<li class="flex items-center gap-2">
				{#if index > 0}
					<span aria-hidden="true">/</span>
				{/if}
				{#if item.href}
					<a
						href={item.href}
						class="underline transition-colors hover:text-gray-900 dark:hover:text-gray-200"
					>
						{item.label}
					</a>
				{:else}
					<span class="font-medium text-gray-900 dark:text-gray-200">
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
