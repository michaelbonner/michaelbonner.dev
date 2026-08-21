<script lang="ts">
	let { href = '', className = '', children } = $props();
</script>

<a
	class={`text-tomato decoration-tomato/50 hover:decoration-tomato focus-visible:outline-tomato inline-flex items-center gap-1 font-sans underline underline-offset-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
	{href}
	target="_blank"
	rel="noreferrer"
>
	{@render children?.()}
</a>
