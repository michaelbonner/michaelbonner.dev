<script lang="ts">
	export let href = '';
</script>

<a class="flex space-x-1 items-center underline" {href} target="_blank" rel="noreferrer">
	<slot />
</a>
