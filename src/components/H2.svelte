<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<h2 class="dark:text-gray-50 text-3xl mt-16">
	{@render children?.()}
</h2>
