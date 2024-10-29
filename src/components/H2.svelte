<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<h2 class="mt-16 text-3xl dark:text-gray-50">
	{@render children?.()}
</h2>
