<script lang="ts">
	interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	let { items = [] as BreadcrumbItem[] } = $props();
</script>

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
						class="hover:text-gray-900 dark:hover:text-gray-200 transition-colors underline"
					>
						{item.label}
					</a>
				{:else}
					<span class="text-gray-900 dark:text-gray-200 font-medium">
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
