<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 * @property {string} [id]
	 */

	/** @type {Props} */
	let { children, id = undefined } = $props();
</script>

<h2 {id} class="pt-16 text-3xl dark:text-gray-50">
	{@render children?.()}
</h2>
