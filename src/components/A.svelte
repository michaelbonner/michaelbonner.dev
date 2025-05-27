<script lang="ts">
	let { href = '', className = '', children } = $props();
</script>

<a
	class={`flex items-center space-x-1 underline ${className}`}
	{href}
	target="_blank"
	rel="noreferrer"
>
	{@render children?.()}
</a>
