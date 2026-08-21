<script lang="ts">
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';

	interface Props {
		/** Small caps label above the heading. */
		eyebrow?: string;
		heading: string;
		/** Optional sentence under the heading. */
		description?: string;
		/** Anchor target, when the section is linked to from elsewhere. */
		id?: string;
		/**
		 * A short count or status shown opposite the heading, e.g. "24 sites".
		 * Sits on the baseline of the heading on wide screens.
		 */
		meta?: string;
		children?: import('svelte').Snippet;
	}

	let {
		eyebrow = undefined,
		heading,
		description = undefined,
		id = undefined,
		meta = undefined,
		children
	}: Props = $props();
</script>

<!--
	One section shape reused across the site: a hairline, an eyebrow, the heading,
	then the content. The rule is what gives long pages a readable rhythm; the old
	version separated sections with nothing but a large top margin.
-->
<section {id} class="border-rule border-t pt-8 lg:pt-12">
	<div
		class={classNames(
			'flex flex-col gap-y-2',
			meta ? 'sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-8' : ''
		)}
	>
		<div class="grid gap-y-2">
			{#if eyebrow}
				<p class={classes.eyebrow}>{eyebrow}</p>
			{/if}
			<h2 class={classes.sectionHeading}>{heading}</h2>
		</div>
		{#if meta}
			<p class={classNames(classes.label, 'shrink-0')}>{meta}</p>
		{/if}
	</div>

	{#if description}
		<p class="text-lead text-ink-muted mt-4 max-w-[65ch] font-serif">{description}</p>
	{/if}

	<div class="mt-8 lg:mt-12">
		{@render children?.()}
	</div>
</section>
