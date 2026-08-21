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
		class="border-rule bg-ground-sunken h-[22rem] w-full rounded-xl border xl:h-[38rem]"
		role="region"
		aria-label="Map of favorite Salt Lake restaurants"
	></div>

	<div
		class="border-rule bg-surface/95 shadow-lift pointer-events-none absolute top-3 right-3 z-500 rounded-lg border px-3 py-2 backdrop-blur-sm"
		aria-label="Pin colors by rating"
	>
		<p class="text-ui-sm text-ink-faint font-sans font-semibold tracking-[0.12em] uppercase">
			Rating
		</p>
		<ul class="text-ui-sm text-ink mt-1.5 flex gap-3 font-sans tabular-nums" role="list">
			<li class="flex items-center gap-1.5">
				<span class="size-2.5 rounded-full bg-(--pin-top)" aria-hidden="true"></span>
				10
			</li>
			<li class="flex items-center gap-1.5">
				<span class="size-2.5 rounded-full bg-(--pin-great)" aria-hidden="true"></span>
				9
			</li>
			<li class="flex items-center gap-1.5">
				<span class="size-2.5 rounded-full bg-(--pin-good)" aria-hidden="true"></span>
				8
			</li>
		</ul>
	</div>

	{#if mappable.length === 0}
		<p
			class="border-rule bg-surface/95 text-ui text-ink-muted pointer-events-none absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-lg border p-4 text-center font-sans backdrop-blur-sm"
		>
			No restaurants to show on the map.
		</p>
	{/if}
</div>

{#if missingCoordinates > 0}
	<p class="text-ui-sm text-ink-faint mt-3 font-sans">
		{missingCoordinates}
		{missingCoordinates === 1 ? 'restaurant is' : 'restaurants are'} missing coordinates and only appear
		in the table.
	</p>
{/if}

<style>
	/*
	 * Leaflet renders pins and popups outside the component's markup, so these
	 * need to be global rather than scoped. Everything below reads from the
	 * site's semantic tokens, which already flip with the colour scheme, so this
	 * file no longer carries a parallel dark-mode block.
	 */
	:global(.restaurant-pin__dot) {
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		border: 2px solid var(--surface);
		border-radius: 9999px;
		box-shadow: 0 1px 4px hsl(var(--shadow-color) / 0.45);
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		transition: transform 150ms var(--ease-out-quart);
	}

	:global(.restaurant-pin__dot--top) {
		background-color: var(--pin-top);
		color: var(--pin-top-ink);
	}

	:global(.restaurant-pin__dot--great) {
		background-color: var(--pin-great);
		color: var(--pin-great-ink);
	}

	:global(.restaurant-pin__dot--good) {
		background-color: var(--pin-good);
		color: var(--pin-good-ink);
	}

	:global(.restaurant-pin:hover .restaurant-pin__dot) {
		transform: scale(1.15);
	}

	:global(.restaurant-pin__dot--active) {
		box-shadow:
			0 0 0 3px var(--surface),
			0 0 0 6px var(--accent),
			0 1px 4px hsl(var(--shadow-color) / 0.45);
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
		border: 1px solid var(--rule);
		border-radius: 0.75rem;
		background: var(--popover-surface);
		-webkit-backdrop-filter: var(--popover-backdrop);
		backdrop-filter: var(--popover-backdrop);
		box-shadow: var(--shadow-float);
		color: var(--ink);
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
		border-radius: 0.5rem;
	}

	:global(.restaurant-preview__image) {
		object-fit: cover;
	}

	:global(.restaurant-preview__missing) {
		background: var(--ground-sunken);
	}

	:global(.restaurant-preview__content) {
		display: grid;
		gap: 0.375rem;
		/* So a long name wraps instead of pushing past the tooltip's max width. */
		min-width: 0;
	}

	:global(.restaurant-preview__name) {
		font-family: var(--font-serif);
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.2;
	}

	:global(.restaurant-preview__tags) {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	:global(.restaurant-preview__tag) {
		border-radius: 9999px;
		background: var(--accent-soft);
		padding: 0.125rem 0.5rem;
		color: var(--accent);
		font-family: var(--font-sans);
		font-size: 0.75rem;
		line-height: 1.4;
	}

	/* Let the container's own background show through while tiles load. */
	:global(.leaflet-container) {
		background: transparent;
		font-family: var(--font-sans);

		/* Both popovers sit on the map rather than covering it: 88% opaque over a
		   blurred backdrop, so the streets under them still read as streets. Kept
		   here, on the one ancestor both the tooltip and the popup panes inherit
		   from, so the surface is set in a single place. */
		--popover-surface: color-mix(in oklab, var(--surface) 88%, transparent);
		--popover-backdrop: blur(0.5rem);
	}

	/* The tip is the little arrow under the popup, and it is a separate box, so it
	   needs the same treatment or it reads as a solid notch. */
	:global(.restaurant-popup .leaflet-popup-content-wrapper),
	:global(.restaurant-popup .leaflet-popup-tip) {
		background: var(--popover-surface);
		-webkit-backdrop-filter: var(--popover-backdrop);
		backdrop-filter: var(--popover-backdrop);
		color: var(--ink);
	}

	:global(.restaurant-popup .leaflet-popup-content-wrapper) {
		border: 1px solid var(--rule);
		border-radius: 0.75rem;
		box-shadow: var(--shadow-float);
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
		border-radius: 0.5rem;
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
		background: var(--ground-sunken);
		color: var(--ink-faint);
		font-size: 0.8125rem;
	}

	:global(.restaurant-popup__name) {
		font-family: var(--font-serif);
		font-size: 1.0625rem;
		font-weight: 600;
	}

	:global(.restaurant-popup__meta),
	:global(.restaurant-popup__address) {
		color: var(--ink-muted);
		font-size: 0.8125rem;
	}

	:global(.restaurant-popup__order) {
		font-style: italic;
	}

	:global(.restaurant-popup__link) {
		justify-self: start;
		margin-top: 0.375rem;
		color: var(--accent);
		font-size: 0.8125rem;
		font-weight: 500;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
	}

	:global(.restaurant-popup .leaflet-popup-close-button) {
		color: var(--ink-faint);
	}

	/* Leaflet's zoom buttons ship with their own light chrome. */
	:global(.leaflet-bar) {
		border: 1px solid var(--rule);
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: var(--shadow-panel);
	}

	:global(.leaflet-bar a) {
		background: var(--surface);
		border-bottom-color: var(--rule);
		color: var(--ink-muted);
	}

	:global(.leaflet-bar a:hover) {
		background: var(--ground-sunken);
		color: var(--ink);
	}

	:global(.leaflet-control-attribution) {
		background: color-mix(in oklab, var(--surface) 80%, transparent) !important;
		color: var(--ink-faint);
		font-family: var(--font-sans);
	}

	:global(.leaflet-control-attribution a) {
		color: var(--ink-muted);
	}
</style>
