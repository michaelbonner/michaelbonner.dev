<script>
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 * @property {string} [id]
	 */

	/** @type {Props} */
	let { children, id = undefined } = $props();
</script>

<h2 {id} class="max-w-[18ch] pt-16 text-5xl font-medium tracking-tight text-balance sm:text-6xl">
	{@render children?.()}
</h2>
