<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore
	import PhotoSwipeLightbox from 'photoswipe/lightbox';

	import 'photoswipe/style.css';

	type Image = {
		altText: string;
		url: {
			img: {
				h: number;
				src: string;
				w: number;
			};
			sources: Record<string, string>;
		};
	};

	export let galleryID = '';
	export let images: Image[] = [];

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});
</script>

<div class="grid grid-cols-2 lg:grid-cols-4 items-center gap-2" id={galleryID}>
	{#each images as image}
		<a
			href={image.url.img.src}
			data-pswp-width={image.url.img.w}
			data-pswp-height={image.url.img.h}
			target="_blank"
			rel="noreferrer"
		>
			<enhanced:img
				alt={image.altText}
				class="my-0 py-0 rounded-md"
				loading="lazy"
				sizes="(max-width: 600px) 100vw, 600px"
				src={image.url}
			/>
		</a>
	{/each}
</div>
