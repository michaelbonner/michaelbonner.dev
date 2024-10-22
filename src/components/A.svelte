<script lang="ts">
	interface Props {
		href?: string;
		className?: string;
		children?: import('svelte').Snippet;
	}

	let { href = '', className = '', children }: Props = $props();
</script>

<a
	class={`flex space-x-1 items-center underline ${className}`}
	{href}
	target="_blank"
	rel="noreferrer"
>
	{@render children?.()}
</a>
