<script lang="ts">
	let { href = '', className = '', children } = $props();
</script>

<a
	class={`flex space-x-1 items-center underline ${className}`}
	{href}
	target="_blank"
	rel="noreferrer"
>
	{@render children?.()}
</a>
