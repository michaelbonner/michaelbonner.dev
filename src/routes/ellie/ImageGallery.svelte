<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-ignore
	import PhotoSwipeLightbox from 'photoswipe/lightbox';

	import 'photoswipe/style.css';

	type Image = {
		altText: string;
		height: number;
		url: string;
		width: number;
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
			href={image.url}
			data-pswp-width={image.width}
			data-pswp-height={image.height}
			target="_blank"
			rel="noreferrer"
		>
			<img alt={image.altText} class="my-0 py-0 rounded-md" src={image.url} />
		</a>
	{/each}
</div>
