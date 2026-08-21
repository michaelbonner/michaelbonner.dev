<script lang="ts">
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';

	let { href = '', className = '', children } = $props();
</script>

<!--
	An external link. The icon and label are laid out by the caller, so this only
	owns the link treatment itself.
-->
<a
	class={classNames('inline-flex items-center gap-x-1.5', classes.bodyLink, className)}
	{href}
	target="_blank"
	rel="noreferrer"
>
	{@render children?.()}
</a>
