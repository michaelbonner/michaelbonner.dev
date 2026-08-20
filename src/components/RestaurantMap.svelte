<script lang="ts">
	import type { Restaurant } from '$lib/data/restaurants';
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

	// CARTO's OpenStreetMap-derived basemaps, which need no API key and come in a
	// dark variant so the map can follow the rest of the site's color scheme.
	const TILES = {
		light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
		dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
	};
	const TILE_ATTRIBUTION =
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'&copy; <a href="https://carto.com/attributions">CARTO</a>';

	let container: HTMLDivElement;
	let L: typeof Leaflet | undefined = $state();
	let map: Leaflet.Map | undefined;
	let tileLayer: Leaflet.TileLayer | undefined;
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

	const buildIcon = (leaflet: typeof Leaflet, restaurant: Restaurant, isActive: boolean) =>
		leaflet.divIcon({
			// A div icon avoids Leaflet's default marker images, which need bundler-specific
			// asset URLs, and lets the pin be styled and animated with the rest of the site.
			className: 'restaurant-pin',
			html: `<span class="restaurant-pin__dot${isActive ? ' restaurant-pin__dot--active' : ''}">${restaurant.rating}</span>`,
			iconSize: [28, 28],
			iconAnchor: [14, 14],
			popupAnchor: [0, -14]
		});

	const buildPopup = (restaurant: Restaurant) => {
		const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
			`${restaurant.name}, ${restaurant.location}, Utah`
		)}`;

		return `
			<strong class="restaurant-popup__name">${escapeHtml(restaurant.name)}</strong>
			<span class="restaurant-popup__meta">${escapeHtml(restaurant.tags.join(', '))} &middot; $${restaurant.pricePerPerson}/person &middot; ${restaurant.rating}/10</span>
			<span class="restaurant-popup__address">${escapeHtml(restaurant.location)}</span>
			<a class="restaurant-popup__link" href="${escapeHtml(mapsUrl)}" target="_blank" rel="noopener noreferrer">Directions</a>
		`;
	};

	onMount(() => {
		let disposed = false;
		let stopWatchingColorScheme: (() => void) | undefined;
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

			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
			const applyTiles = () => {
				if (tileLayer) tileLayer.remove();
				tileLayer = leaflet
					.tileLayer(prefersDark.matches ? TILES.dark : TILES.light, {
						attribution: TILE_ATTRIBUTION,
						maxZoom: 19
					})
					.addTo(instance);
			};

			applyTiles();
			prefersDark.addEventListener('change', applyTiles);
			stopWatchingColorScheme = () => prefersDark.removeEventListener('change', applyTiles);

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
			stopWatchingColorScheme?.();
			map?.remove();
			map = undefined;
			tileLayer = undefined;
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
			for (const marker of Object.values(markersByName)) marker.remove();
			markersByName = {};

			for (const restaurant of visible) {
				const marker = leaflet
					.marker([restaurant.lat!, restaurant.lng!], {
						icon: buildIcon(leaflet, restaurant, restaurant.name === activeName),
						title: restaurant.name,
						alt: restaurant.name,
						riseOnHover: true
					})
					.bindPopup(buildPopup(restaurant), {
						className: 'restaurant-popup',
						autoPanPadding: [24, 24]
					})
					.on('click', () => onSelect(restaurant.name))
					.addTo(instance);

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
		background-color: #1e40af;
		box-shadow: 0 1px 4px rgb(0 0 0 / 0.4);
		color: white;
		font-size: 0.8125rem;
		font-weight: 600;
		transition:
			transform 150ms ease,
			background-color 150ms ease;
	}

	:global(.restaurant-pin:hover .restaurant-pin__dot) {
		transform: scale(1.15);
	}

	:global(.restaurant-pin__dot--active) {
		background-color: #b91c1c;
		transform: scale(1.25);
	}

	/* Let the container's own background show through while tiles load. */
	:global(.leaflet-container) {
		background: transparent;
	}

	:global(.restaurant-popup .leaflet-popup-content) {
		display: grid;
		gap: 0.25rem;
		margin: 0.75rem;
		font-family: inherit;
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
		:global(.restaurant-popup .leaflet-popup-content-wrapper),
		:global(.restaurant-popup .leaflet-popup-tip) {
			background-color: #1f2937;
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
