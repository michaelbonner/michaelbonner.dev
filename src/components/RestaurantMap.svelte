<script lang="ts">
	import type { Restaurant } from '$lib/data/restaurants';
	import { restaurantImage } from '$lib/data/restaurantImages';
	import type * as Leaflet from 'leaflet';
	import { onMount, untrack } from 'svelte';
	// Vite extracts this at build time, so it is safe to import outside the browser guard.
	import 'leaflet/dist/leaflet.css';

	interface Props {
		/** The currently visible (filtered) restaurants. Only those with coordinates get a pin. */
		restaurants: Restaurant[];
		/** Name of the highlighted restaurant, shared with the table. */
		activeName: string | null;
		/** Called when a pin is clicked, so the table can scroll to and highlight the row. */
		onSelect: (name: string | null) => void;
	}

	let { restaurants, activeName, onSelect }: Props = $props();

	// Salt Lake City, used until there is something to fit the map to.
	const SALT_LAKE_CITY: [number, number] = [40.7608, -111.891];

	// Voyager stays light enough to read against the site's blue-gray dark theme.
	// CARTO's dark tiles are nearly black and make the map feel disconnected from the page.
	const TILE_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
	const TILE_ATTRIBUTION =
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'&copy; <a href="https://carto.com/attributions">CARTO</a>';

	let container: HTMLDivElement;
	let L: typeof Leaflet | undefined = $state();
	let map: Leaflet.Map | undefined;
	// Imperative Leaflet handles rather than reactive state, so a plain record is enough.
	let markersByName: Record<string, Leaflet.Marker> = {};

	const mappable = $derived(
		restaurants.filter((restaurant) => restaurant.lat != null && restaurant.lng != null)
	);
	const missingCoordinates = $derived(restaurants.length - mappable.length);

	const escapeHtml = (value: string) =>
		value.replace(
			/[&<>"']/g,
			(character) =>
				({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!
		);

	type RatingBand = 'top' | 'great' | 'good';

	const getRatingBand = (rating: number): RatingBand => {
		if (rating >= 10) return 'top';
		if (rating >= 9) return 'great';
		return 'good';
	};

	const buildIcon = (leaflet: typeof Leaflet, restaurant: Restaurant, isActive: boolean) =>
		leaflet.divIcon({
			// A div icon avoids Leaflet's default marker images, which need bundler-specific
			// asset URLs, and lets the pin be styled and animated with the rest of the site.
			className: 'restaurant-pin',
			html: `<span class="restaurant-pin__dot restaurant-pin__dot--${getRatingBand(restaurant.rating)}${isActive ? ' restaurant-pin__dot--active' : ''}" data-rating="${restaurant.rating}">${restaurant.rating}</span>`,
			iconSize: [28, 28],
			iconAnchor: [14, 14],
			popupAnchor: [0, -14]
		});

	/**
	 * Leaflet takes its popups and tooltips as HTML strings, so `<enhanced:img>` is not
	 * available here. This builds the same `<picture>` markup it would compile to, from
	 * the `Picture` the photo lookup hands back.
	 *
	 * `sizes` is how wide the photo actually renders, so the browser can take the small
	 * end of the srcset for the preview's thumbnail. `missingLabel` is empty there too:
	 * the thumbnail has no room for words.
	 */
	const buildImage = (
		restaurant: Restaurant,
		blockClass: string,
		sizes: string,
		missingLabel: string
	) => {
		const picture = restaurantImage(restaurant.name);
		if (!picture) return `<span class="${blockClass}__missing">${missingLabel}</span>`;

		const sources = Object.entries(picture.sources)
			.map(
				([format, srcset]) =>
					`<source srcset="${escapeHtml(srcset)}" sizes="${sizes}" type="image/${format}">`
			)
			.join('');

		return `<picture class="${blockClass}__picture">${sources}<img class="${blockClass}__image" src="${escapeHtml(picture.img.src)}" alt="" loading="lazy" width="${picture.img.w}" height="${picture.img.h}"></picture>`;
	};

	const buildPopup = (restaurant: Restaurant) => {
		const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
			`${restaurant.name}, ${restaurant.locations[0]}, Utah`
		)}`;
		// The popup is the deliberate look, so it keeps the full-width photo.
		const image = buildImage(restaurant, 'restaurant-popup', '240px', 'Photo coming soon');

		return `
			${image}
			<strong class="restaurant-popup__name">${escapeHtml(restaurant.name)}</strong>
			<span class="restaurant-popup__meta">${escapeHtml(restaurant.tags.join(', '))} &middot; $${restaurant.pricePerPerson}/person &middot; ${restaurant.rating}/10</span>
			<span class="restaurant-popup__address">${escapeHtml(restaurant.locations.join('/'))}</span>
			<a class="restaurant-popup__link" href="${escapeHtml(mapsUrl)}" target="_blank" rel="noopener noreferrer">Directions</a>
		`;
	};

	const buildPreview = (restaurant: Restaurant) => {
		const image = buildImage(restaurant, 'restaurant-preview', '48px', '');
		const tags = restaurant.tags
			.map((tag) => `<span class="restaurant-preview__tag">${escapeHtml(tag)}</span>`)
			.join('');

		return `
			<div class="restaurant-preview__card">
				${image}
				<div class="restaurant-preview__content">
					<strong class="restaurant-preview__name">${escapeHtml(restaurant.name)}</strong>
					<span class="restaurant-preview__tags">${tags}</span>
				</div>
			</div>
		`;
	};

	onMount(() => {
		let disposed = false;
		let stopWatchingSize: (() => void) | undefined;

		// Leaflet touches `window` at import time, so it can only be loaded in the browser.
		(async () => {
			const leaflet = (await import('leaflet')).default;
			if (disposed) return;

			const instance = leaflet.map(container, {
				center: SALT_LAKE_CITY,
				zoom: 12,
				scrollWheelZoom: false
			});

			leaflet
				.tileLayer(TILE_URL, {
					attribution: TILE_ATTRIBUTION,
					maxZoom: 19
				})
				.addTo(instance);

			// Scroll zoom is off by default so the page still scrolls over the map;
			// clicking the map opts into it.
			instance.on('focus', () => instance.scrollWheelZoom.enable());
			instance.on('blur', () => instance.scrollWheelZoom.disable());

			// The map lives in a sticky grid column, so its box is not final on first
			// paint. Without this, Leaflet fits the pins to a stale size and pushes
			// them to the edges.
			const resizeObserver = new ResizeObserver(() => instance.invalidateSize());
			resizeObserver.observe(container);
			stopWatchingSize = () => resizeObserver.disconnect();

			map = instance;
			L = leaflet;
		})();

		return () => {
			disposed = true;
			stopWatchingSize?.();
			map?.remove();
			map = undefined;
			markersByName = {};
		};
	});

	// Rebuild the pins whenever the filtered set changes, then frame them.
	$effect(() => {
		const leaflet = L;
		const instance = map;
		const visible = mappable;
		if (!leaflet || !instance) return;

		untrack(() => {
			// Close first: removing a marker while its popup is open leaves the popup
			// element behind on the map, so rebuilding would stack up orphaned copies.
			instance.closePopup();

			for (const marker of Object.values(markersByName)) marker.remove();
			markersByName = {};

			for (const restaurant of visible) {
				const marker = leaflet
					.marker([restaurant.lat!, restaurant.lng!], {
						icon: buildIcon(leaflet, restaurant, restaurant.name === activeName),
						title: restaurant.name,
						alt: `${restaurant.name}, rated ${restaurant.rating} out of 10`,
						riseOnHover: true
					})
					.bindTooltip(buildPreview(restaurant), {
						className: 'restaurant-preview',
						direction: 'auto',
						offset: [18, 0],
						opacity: 1
					})
					.bindPopup(buildPopup(restaurant), {
						className: 'restaurant-popup',
						autoPanPadding: [24, 24]
					})
					.on('click', () => onSelect(restaurant.name))
					.addTo(instance);
				marker.on('popupopen', () => marker.closeTooltip());

				markersByName[restaurant.name] = marker;
			}

			if (visible.length > 0) {
				// Make sure Leaflet is working from the container's current size before framing.
				instance.invalidateSize();
				instance.fitBounds(
					leaflet.latLngBounds(visible.map((r) => [r.lat!, r.lng!] as [number, number])),
					{ padding: [40, 40], maxZoom: 15 }
				);
			} else {
				instance.setView(SALT_LAKE_CITY, 12);
			}

			// Rebuilding replaced every marker, which closed the open popup. The
			// selection effect below only tracks `activeName`, so it will not re-run
			// for a filter or sort change — reopen the popup here instead, after
			// framing, so a selected restaurant keeps its popup.
			if (activeName) markersByName[activeName]?.openPopup();
		});
	});

	// Keep the highlighted pin in sync with the table selection.
	$effect(() => {
		const leaflet = L;
		const instance = map;
		const name = activeName;
		if (!leaflet || !instance) return;

		untrack(() => {
			for (const [markerName, marker] of Object.entries(markersByName)) {
				const restaurant = mappable.find((r) => r.name === markerName);
				if (restaurant) marker.setIcon(buildIcon(leaflet, restaurant, markerName === name));
			}

			if (!name) {
				instance.closePopup();
				return;
			}

			const active = markersByName[name];
			if (!active) return;

			// Opening the popup is enough to bring the pin into view: Leaflet's autoPan
			// moves the map so the whole popup fits. Panning by hand first raced with
			// that and left the popup clipped at the container edge.
			active.openPopup();
		});
	});
</script>

<div class="relative">
	<div
		bind:this={container}
		class="h-[22rem] w-full rounded-lg border border-gray-300 bg-gray-100 xl:h-[38rem] dark:border-gray-600 dark:bg-gray-900"
		role="region"
		aria-label="Map of favorite Salt Lake restaurants"
	></div>

	<div
		class="pointer-events-none absolute top-3 right-3 z-500 rounded-md border border-gray-300 bg-white/95 px-3 py-2 text-gray-900 shadow-md backdrop-blur-sm"
		aria-label="Pin colors by rating"
	>
		<p class="text-xs font-semibold tracking-wide uppercase">Rating</p>
		<ul class="mt-1 flex gap-3 text-sm tabular-nums" role="list">
			<li class="flex items-center gap-1.5">
				<span class="size-2.5 rounded-full bg-emerald-700" aria-hidden="true"></span>
				10
			</li>
			<li class="flex items-center gap-1.5">
				<span class="size-2.5 rounded-full bg-amber-400" aria-hidden="true"></span>
				9
			</li>
			<li class="flex items-center gap-1.5">
				<span class="size-2.5 rounded-full bg-blue-700" aria-hidden="true"></span>
				8
			</li>
		</ul>
	</div>

	{#if mappable.length === 0}
		<p
			class="pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-md bg-gray-200/95 p-4 text-center dark:bg-gray-800/95"
		>
			No restaurants to show on the map.
		</p>
	{/if}
</div>

{#if missingCoordinates > 0}
	<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
		{missingCoordinates}
		{missingCoordinates === 1 ? 'restaurant is' : 'restaurants are'} missing coordinates and only appear
		in the table.
	</p>
{/if}

<style>
	/*
	 * Leaflet renders pins and popups outside the component's markup, so these
	 * need to be global rather than scoped.
	 */
	:global(.restaurant-pin__dot) {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 2px solid white;
		border-radius: 9999px;
		box-shadow: 0 1px 4px rgb(0 0 0 / 0.4);
		color: white;
		font-size: 0.8125rem;
		font-weight: 600;
		transition: transform 150ms ease;
	}

	:global(.restaurant-pin__dot--top) {
		background-color: var(--color-emerald-700);
	}

	:global(.restaurant-pin__dot--great) {
		background-color: var(--color-amber-400);
		color: var(--color-amber-950);
	}

	:global(.restaurant-pin__dot--good) {
		background-color: var(--color-blue-700);
	}

	:global(.restaurant-pin:hover .restaurant-pin__dot) {
		transform: scale(1.15);
	}

	:global(.restaurant-pin__dot--active) {
		box-shadow:
			0 0 0 3px white,
			0 0 0 6px var(--color-gray-900),
			0 1px 4px rgb(0 0 0 / 0.4);
		transform: scale(1.25);
	}

	:global(.restaurant-preview.leaflet-tooltip) {
		/* Shrink-wraps a short name and wraps a long one, rather than always taking
		   the full 15rem of map the popup does. Leaflet's own tooltips never wrap.
		   max-content, not auto: the tooltip pane it sits in is zero-wide, so auto
		   would leave every name broken onto its own line. */
		width: max-content;
		max-width: 15rem;
		overflow: hidden;
		padding: 0;
		white-space: normal;
		border: 1px solid var(--color-gray-300);
		border-radius: 0.5rem;
		background: var(--popover-surface);
		-webkit-backdrop-filter: var(--popover-backdrop);
		backdrop-filter: var(--popover-backdrop);
		box-shadow: 0 0.5rem 1.5rem rgb(15 23 42 / 0.22);
		color: var(--color-gray-900);
		font-family: inherit;
	}

	:global(.restaurant-preview.leaflet-tooltip::before) {
		display: none;
	}

	/* Hovering is a glance, so the preview is a chip: a thumbnail on the left with
	   the name beside it. Clicking the pin is the deliberate act, and that popup is
	   where the photo gets the room to be looked at. */
	:global(.restaurant-preview__card) {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem;
	}

	:global(.restaurant-preview__picture),
	:global(.restaurant-preview__image),
	:global(.restaurant-preview__missing) {
		display: block;
		flex: none;
		width: 3rem;
		height: 3rem;
		border-radius: 0.375rem;
	}

	:global(.restaurant-preview__image) {
		object-fit: cover;
	}

	:global(.restaurant-preview__missing) {
		background: var(--color-gray-200);
	}

	:global(.restaurant-preview__content) {
		display: grid;
		gap: 0.375rem;
		/* So a long name wraps instead of pushing past the tooltip's max width. */
		min-width: 0;
	}

	:global(.restaurant-preview__name) {
		font-size: 1rem;
		line-height: 1.2;
	}

	:global(.restaurant-preview__tags) {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	:global(.restaurant-preview__tag) {
		border-radius: 9999px;
		background: var(--color-blue-100);
		padding: 0.125rem 0.5rem;
		color: var(--color-blue-900);
		font-size: 0.75rem;
		line-height: 1.4;
	}

	/* Let the container's own background show through while tiles load. */
	:global(.leaflet-container) {
		background: transparent;

		/* Both popovers sit on the map rather than covering it: 85% opaque over a
		   blurred backdrop, so the streets under them still read as streets. Kept
		   here, on the one ancestor both the tooltip and the popup panes inherit
		   from, so light and dark each set the surface in a single place. */
		--popover-surface: color-mix(in oklab, var(--color-gray-50) 85%, transparent);
		--popover-backdrop: blur(0.5rem);
	}

	/* The tip is the little arrow under the popup, and it is a separate box, so it
	   needs the same treatment or it reads as a solid white notch. */
	:global(.restaurant-popup .leaflet-popup-content-wrapper),
	:global(.restaurant-popup .leaflet-popup-tip) {
		background: var(--popover-surface);
		-webkit-backdrop-filter: var(--popover-backdrop);
		backdrop-filter: var(--popover-backdrop);
	}

	:global(.restaurant-popup .leaflet-popup-content) {
		display: grid;
		gap: 0.25rem;
		width: 15rem !important;
		margin: 0.75rem;
		font-family: inherit;
	}

	:global(.restaurant-popup__picture),
	:global(.restaurant-popup__image),
	:global(.restaurant-popup__missing) {
		display: block;
		width: 100%;
		margin-bottom: 0.375rem;
		border-radius: 0.375rem;
		aspect-ratio: 16 / 9;
	}

	/* The picture carries the spacing; the image just fills it. */
	:global(.restaurant-popup__image) {
		margin-bottom: 0;
		object-fit: cover;
	}

	:global(.restaurant-popup__missing) {
		display: grid;
		place-items: center;
		background: var(--color-gray-200);
		color: var(--color-gray-600);
		font-size: 0.8125rem;
	}

	:global(.restaurant-popup__name) {
		font-size: 1rem;
	}

	:global(.restaurant-popup__meta),
	:global(.restaurant-popup__address) {
		color: #4b5563;
	}

	:global(.restaurant-popup__order) {
		font-style: italic;
	}

	:global(.restaurant-popup__link) {
		justify-self: start;
		margin-top: 0.25rem;
		border-bottom: 1px solid currentColor;
	}

	/* Popups are the one piece of Leaflet chrome big enough to clash in dark mode. */
	@media (prefers-color-scheme: dark) {
		:global(.leaflet-container) {
			--popover-surface: color-mix(in oklab, var(--color-gray-800) 85%, transparent);
		}

		:global(.restaurant-preview.leaflet-tooltip) {
			border-color: var(--color-gray-600);
			box-shadow: none;
			color: var(--color-gray-100);
		}

		:global(.restaurant-preview__missing) {
			background: var(--color-gray-700);
			color: var(--color-gray-300);
		}

		:global(.restaurant-popup__missing) {
			background: var(--color-gray-700);
			color: var(--color-gray-300);
		}

		:global(.restaurant-preview__tag) {
			background: var(--color-blue-950);
			color: var(--color-blue-200);
		}

		:global(.restaurant-popup .leaflet-popup-content-wrapper),
		:global(.restaurant-popup .leaflet-popup-tip) {
			color: #e5e7eb;
		}

		:global(.restaurant-popup__meta),
		:global(.restaurant-popup__address) {
			color: #9ca3af;
		}

		:global(.restaurant-popup .leaflet-popup-close-button) {
			color: #9ca3af;
		}
	}
</style>
