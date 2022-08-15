<script lang="ts">
	export let href = '';
	export let className = '';
</script>

<a
	class={`flex space-x-1 items-center underline ${className}`}
	{href}
	target="_blank"
	rel="noreferrer"
>
	<slot />
</a>
