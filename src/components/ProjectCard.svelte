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
	}

	let {
		title,
		description,
		url,
		image,
		github = undefined,
		blogPost = undefined,
		eager = false
	}: Props = $props();
</script>

<!--
	The screenshot is the reason to stop on a card, so it sits flush to the panel
	edge with no inner padding and no border of its own. Hovering lifts the panel
	rather than scaling it, which used to blur the screenshot mid-transition.
-->
<article class={classNames(classes.surfaceInteractive, 'group grid overflow-hidden')}>
	<a href={url} aria-label={`View ${title}`} class="block overflow-hidden">
		<enhanced:img
			alt=""
			class={classNames(
				'bg-ground-sunken aspect-16/10 w-full object-cover object-top',
				'transition-transform duration-500 ease-out group-hover:scale-[1.02]'
			)}
			loading={eager ? 'eager' : 'lazy'}
			src={image}
			sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
		/>
	</a>

	<div class="grid gap-3 p-6">
		<h3 class="text-h3 font-serif font-semibold">
			<a
				href={url}
				class="text-ink hover:text-accent no-underline transition-colors duration-150 ease-out"
			>
				{title}
			</a>
		</h3>

		<p class="text-ink-muted font-serif text-[1.0625rem] leading-relaxed">{description}</p>

		<!-- Links sit on a rule so they read as the card's footer, not as body copy. -->
		<div class="border-rule mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4">
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
	</div>
</article>
