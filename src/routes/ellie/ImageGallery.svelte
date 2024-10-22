<script lang="ts">
	import { onMount } from 'svelte';
	import { clsx } from 'clsx';
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
		objectPosition?: string;
	};

	interface Props {
		galleryID?: string;
		images?: Image[];
	}

	let { galleryID = '', images = [] }: Props = $props();

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
				class={clsx(
					'my-0 py-0 rounded-md aspect-1 object-cover w-full h-full',
					image.objectPosition
				)}
				loading="lazy"
				sizes="min(600px, 100vw)"
				src={image.url}
			/>
		</a>
	{/each}
</div>
