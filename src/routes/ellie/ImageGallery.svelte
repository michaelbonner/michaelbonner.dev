<script lang="ts">
	import { clsx } from 'clsx';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import { onMount } from 'svelte';

	import 'photoswipe/style.css';

	let { galleryID = '', images = [] } = $props();

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});
</script>

<div class="grid grid-cols-2 items-center gap-2 lg:grid-cols-4" id={galleryID}>
	{#each images as image (image.url.img.src)}
		<a
			aria-label={image.altText}
			href={image.url.img.src}
			data-pswp-width={image.url.img.w}
			data-pswp-height={image.url.img.h}
			target="_blank"
			rel="noreferrer"
		>
			<enhanced:img
				alt={image.altText}
				class={clsx(
					'my-0 aspect-[1/1] h-full w-full rounded-md object-cover py-0',
					image.objectPosition
				)}
				loading="lazy"
				sizes="min(600px, 100vw)"
				src={image.url}
			/>
		</a>
	{/each}
</div>
