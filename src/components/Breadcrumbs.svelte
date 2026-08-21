<script lang="ts">
	import { classes } from '../styles/classes';

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

<nav aria-label="Breadcrumb" class="container mx-auto px-6 pt-8 sm:px-8">
	<ol class="flex flex-wrap items-center gap-x-2 gap-y-1">
		{#each items as item, index (item.label)}
			<li class="flex min-w-0 items-center gap-2">
				{#if index > 0}
					<span aria-hidden="true" class="text-ink-faint">/</span>
				{/if}
				{#if item.href}
					<a
						href={item.href}
						class="{classes.label} hover:text-accent no-underline transition-colors duration-150 ease-out"
					>
						{item.label}
					</a>
				{:else}
					<!--
						The current page truncates rather than wrapping. `max-w-full` rather
						than a ch measure: a fixed 60ch never constrains a 320px screen, so
						`truncate` had nothing to work against and a long post title pushed
						the page sideways.
					-->
					<span class="{classes.label} text-ink max-w-full min-w-0 truncate">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
