<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';
	import Github from '../icons/Github.svelte';
	import Link from '../icons/Link.svelte';

	interface Props {
		title: string;
		description: string;
		url: string;
		image: Picture;
		github?: string;
		blogPost?: string;
		/** The first couple of cards are above the fold and load eagerly. */
		eager?: boolean;
		/**
		 * The denser treatment used by the side-project grid, where four columns
		 * leave a card too narrow to carry a full paragraph.
		 */
		compact?: boolean;
	}

	let {
		title,
		description,
		url,
		image,
		github = undefined,
		blogPost = undefined,
		eager = false,
		compact = false
	}: Props = $props();

	/*
	 * Client-work cards run two to a row and side projects four, so a single
	 * `sizes` string would over-serve one grid and starve the other.
	 */
	const sizes = $derived(
		compact
			? '(min-width: 1280px) 300px, (min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw'
			: '(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw'
	);
</script>

<!--
	No panel. Every screenshot already carries its own browser chrome, so wrapping
	it in a bordered, shadowed, rounded card framed a frame, and the repeated
	furniture was louder than the work inside it. The screenshot now sits directly
	on the page behind a hairline, with the type as a quiet caption underneath —
	which is also what `DESIGN.md` asks for, letting the work be the loudest thing
	on the page.

	The hairline and the sunken well behind it still matter: most of these
	screenshots are near-white at the edges and would otherwise bleed into the
	ground with no telling where the image stops.
-->
<!--
	Rows are `auto auto 1fr auto` so a card in a tall row spends its extra height
	on the description and leaves the screenshot at its own aspect ratio. It also
	drops the Visit/Source row onto the bottom edge, so those links line up across
	a row instead of floating at whatever height the copy happened to end at.
-->
<article class="group grid grid-rows-[auto_auto_1fr_auto] gap-3">
	<a
		href={url}
		aria-label={`View ${title}`}
		class={classNames(
			'border-rule bg-ground-sunken block overflow-hidden rounded-lg border',
			'transition-[border-color,box-shadow] duration-200 ease-out',
			'group-hover:border-rule-strong group-hover:shadow-lift'
		)}
	>
		<enhanced:img
			alt=""
			class={classNames(
				compact ? 'aspect-16/10' : 'aspect-16/9',
				'w-full object-cover object-top',
				'transition-transform duration-500 ease-out group-hover:scale-[1.02]'
			)}
			loading={eager ? 'eager' : 'lazy'}
			src={image}
			{sizes}
		/>
	</a>

	<h3 class={classNames(compact ? 'text-lead' : 'text-h3', 'font-serif font-semibold')}>
		<a
			href={url}
			class="text-ink hover:text-accent no-underline transition-colors duration-150 ease-out"
		>
			{title}
		</a>
	</h3>

	<!--
		Clamped rather than shortened in the data, so the full sentence stays in the
		markup for search and for screen readers; four columns simply have no room
		to set six lines of it.
	-->
	<p
		class={classNames(
			'text-ink-muted font-serif',
			compact ? 'line-clamp-3 text-[0.9375rem] leading-normal' : 'text-[1.0625rem] leading-relaxed'
		)}
	>
		{description}
	</p>

	<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
		<a
			href={url}
			class={classNames(classes.label, 'hover:text-accent inline-flex items-center gap-1.5')}
		>
			<Link className="size-4" />
			<span>Visit</span>
		</a>
		{#if github}
			<a
				href={github}
				class={classNames(classes.label, 'hover:text-accent inline-flex items-center gap-1.5')}
			>
				<Github className="size-4" />
				<span>Source</span>
			</a>
		{/if}
		{#if blogPost}
			<a
				href={blogPost}
				class={classNames(classes.label, 'hover:text-accent inline-flex items-center gap-1.5')}
			>
				<svg
					class="size-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
					/>
				</svg>
				<span>Write-up<span class="sr-only"> about {title}</span></span>
			</a>
		{/if}
	</div>
</article>
