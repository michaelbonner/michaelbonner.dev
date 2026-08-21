<script lang="ts">
	import { classNames } from '../functions/classNames';
	import { restaurantImage } from '$lib/data/restaurantImages';
	import { onMount } from 'svelte';

	interface Props {
		/** Restaurant whose photo to show. */
		name: string;
		/** How big the photo renders. The table and the cards want different sizes. */
		size: 40 | 64;
	}

	let { name, size }: Props = $props();

	const image = $derived(restaurantImage(name));
	// The photo never fills more than its box, so the browser can take the small
	// end of the srcset instead of the full-size photo.
	const sizes = $derived(`${size}px`);

	let box: HTMLDivElement;
	let near = $state(false);

	onMount(() => {
		// `loading="lazy"` on its own defers almost nothing here. The list is only a
		// couple of screens tall, so every row falls inside the distance the browser
		// loads ahead by, and the copy of the list that the current breakpoint hides
		// has no layout box at all, which makes the browser fetch all of it right
		// away rather than guess. An observer answers both: a `display: none` box
		// never intersects, so the hidden list stays unfetched until it is shown.
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries.some((entry) => entry.isIntersecting)) return;
				near = true;
				observer.disconnect();
			},
			// Roughly a screen of runway, so a photo has arrived by the time it is
			// scrolled to rather than fading in under the reader.
			{ rootMargin: '400px' }
		);
		observer.observe(box);

		return () => observer.disconnect();
	});
</script>

<!--
	The box is always here, at its final size, so the names stay aligned and nothing
	shifts when the photo arrives or when a restaurant has no photo yet. The photo is
	decorative: the name sits right beside it, so an alt text would only repeat what
	the row already says.
-->
<div
	bind:this={box}
	data-photo={image ? 'ready' : 'missing'}
	class={classNames(
		size === 40 ? 'size-10' : 'size-16',
		// The <picture> that enhanced:img renders is what sits in the flex row, so
		// the box has to be on this wrapper. Left to itself the picture collapses.
		'bg-ground-sunken shrink-0 rounded-md *:size-full'
	)}
>
	{#if near && image}
		<enhanced:img
			src={image}
			alt=""
			loading="lazy"
			{sizes}
			class="size-full rounded-md object-cover"
		/>
	{/if}
</div>
