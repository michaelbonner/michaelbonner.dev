<script lang="ts">
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';

	interface Props {
		children?: import('svelte').Snippet;
		id?: string;
		/** Extra classes, for the rare heading that needs different spacing. */
		className?: string;
	}

	let { children, id = undefined, className = '' }: Props = $props();
</script>

<h2 {id} class={classNames(classes.sectionHeading, className)}>
	{@render children?.()}
</h2>
