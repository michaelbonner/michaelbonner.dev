<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { ResolvedPathname } from '$app/types';
	import Seo from '../../components/Seo.svelte';
	import RestaurantMap from '../../components/RestaurantMap.svelte';
	import RestaurantThumbnail from '../../components/RestaurantThumbnail.svelte';
	import { classNames } from '../../functions/classNames';
	import { classes } from '../../styles/classes';
	import {
		locations,
		pricesPerPerson,
		restaurantTags,
		restaurants,
		type Restaurant
	} from '$lib/data/restaurants';

	type SortKey = 'name' | 'tags' | 'locations' | 'pricePerPerson' | 'rating';
	type SortDirection = 'asc' | 'desc';

	const columns: { key: SortKey; label: string; alignRight: boolean }[] = [
		{ key: 'name', label: 'Restaurant', alignRight: false },
		{ key: 'tags', label: 'Tags', alignRight: false },
		{ key: 'locations', label: 'Location', alignRight: false },
		{ key: 'pricePerPerson', label: 'Price/person', alignRight: true },
		{ key: 'rating', label: 'Rating', alignRight: true }
	];

	// Text columns sort A–Z first; numeric columns are most useful highest-first.
	const defaultDirection: Record<SortKey, SortDirection> = {
		name: 'asc',
		tags: 'asc',
		locations: 'asc',
		pricePerPerson: 'desc',
		rating: 'desc'
	};

	const ratingOptions = [10, 9, 8];

	type Filters = {
		search: string;
		tag: string;
		location: string;
		pricePerPerson: number;
		minRating: number;
		sortKey: SortKey;
		sortDirection: SortDirection;
	};

	const defaults: Filters = {
		search: '',
		tag: '',
		location: '',
		pricePerPerson: 0,
		minRating: 0,
		sortKey: 'rating',
		sortDirection: 'desc'
	};

	/** Query-string names for the sort columns, so shared links stay readable. */
	const sortParams: Record<SortKey, string> = {
		name: 'name',
		tags: 'tags',
		locations: 'location',
		pricePerPerson: 'price',
		rating: 'rating'
	};

	// A hand-edited or stale link should fall back to the default rather than filter
	// the list down to nothing, so every value has to be one the controls can produce.
	const oneOf = <T,>(options: readonly T[], value: T, fallback: T) =>
		options.includes(value) ? value : fallback;

	const readFilters = (url: URL): Filters => {
		const params = url.searchParams;
		const [sortName, direction] = (params.get('sort') ?? '').split('-');
		const sortKey =
			(Object.keys(sortParams) as SortKey[]).find((key) => sortParams[key] === sortName) ??
			defaults.sortKey;

		return {
			search: params.get('q') ?? defaults.search,
			tag: oneOf(restaurantTags, params.get('tag') ?? '', defaults.tag),
			location: oneOf(locations, params.get('location') ?? '', defaults.location),
			pricePerPerson: oneOf(pricesPerPerson, Number(params.get('price')), defaults.pricePerPerson),
			minRating: oneOf(ratingOptions, Number(params.get('rating')), defaults.minRating),
			sortKey,
			sortDirection:
				direction === 'asc' || direction === 'desc' ? direction : defaultDirection[sortKey]
		};
	};

	// Defaults are left out so an unfiltered page keeps a clean `/restaurants` URL.
	const toQuery = (filters: Filters) => {
		const params: [string, string][] = [];

		if (filters.search) params.push(['q', filters.search]);
		if (filters.tag) params.push(['tag', filters.tag]);
		if (filters.location) params.push(['location', filters.location]);
		if (filters.pricePerPerson) params.push(['price', String(filters.pricePerPerson)]);
		if (filters.minRating) params.push(['rating', String(filters.minRating)]);
		if (filters.sortKey !== defaults.sortKey || filters.sortDirection !== defaults.sortDirection) {
			params.push(['sort', `${sortParams[filters.sortKey]}-${filters.sortDirection}`]);
		}

		return params.map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
	};

	// The initial read happens during render, so a shared link is already filtered in
	// the server-rendered HTML instead of snapping into place after hydration.
	const initial = readFilters(page.url);

	let search = $state(initial.search);
	let tag = $state(initial.tag);
	let location = $state(initial.location);
	let pricePerPerson = $state(initial.pricePerPerson);
	let minRating = $state(initial.minRating);
	let sortKey = $state<SortKey>(initial.sortKey);
	let sortDirection = $state<SortDirection>(initial.sortDirection);
	let activeName = $state<string | null>(null);

	let listElement: HTMLDivElement | undefined = $state();

	const hasFilters = $derived(Boolean(search || tag || location || pricePerPerson || minRating));

	const matchesSearch = (restaurant: Restaurant, query: string) => {
		const haystack = [
			restaurant.name,
			restaurant.notes,
			...restaurant.tags,
			...restaurant.locations
		]
			.filter(Boolean)
			.join(' ')
			.toLowerCase();

		return haystack.includes(query);
	};

	const filtered = $derived.by(() => {
		const query = search.trim().toLowerCase();

		return restaurants.filter((restaurant) => {
			if (query && !matchesSearch(restaurant, query)) return false;
			if (tag && !restaurant.tags.includes(tag)) return false;
			if (location && !restaurant.locations.includes(location)) return false;
			if (pricePerPerson && restaurant.pricePerPerson !== pricePerPerson) return false;
			if (minRating && restaurant.rating < minRating) return false;
			return true;
		});
	});

	const visible = $derived.by(() => {
		const direction = sortDirection === 'asc' ? 1 : -1;

		return [...filtered].sort((a, b) => {
			const left = a[sortKey];
			const right = b[sortKey];

			const comparison =
				typeof left === 'number' && typeof right === 'number'
					? left - right
					: String(left).localeCompare(String(right));

			// Fall back to name so equal ratings and prices keep a stable, predictable order.
			return comparison === 0 ? a.name.localeCompare(b.name) : comparison * direction;
		});
	});

	const toggleSort = (key: SortKey) => {
		if (sortKey === key) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
			return;
		}
		sortKey = key;
		sortDirection = defaultDirection[key];
	};

	const clearFilters = () => {
		search = defaults.search;
		tag = defaults.tag;
		location = defaults.location;
		pricePerPerson = defaults.pricePerPerson;
		minRating = defaults.minRating;
	};

	// The URL is the shareable record of the current view: the controls write to it, and
	// a navigation (a pasted link, the back button) writes back into the controls.
	$effect(() => {
		const filters = readFilters(page.url);

		search = filters.search;
		tag = filters.tag;
		location = filters.location;
		pricePerPerson = filters.pricePerPerson;
		minRating = filters.minRating;
		sortKey = filters.sortKey;
		sortDirection = filters.sortDirection;
	});

	let urlSynced = false;

	$effect(() => {
		const query = toQuery({
			search,
			tag,
			location,
			pricePerPerson,
			minRating,
			sortKey,
			sortDirection
		});

		// Nothing to write on the first run, since the controls came from this URL.
		// Skipping it also keeps us clear of replaceState before the router is ready.
		if (!urlSynced) {
			urlSynced = true;
			return;
		}

		// `location` is the filter above, not the browser's, hence `window.location`.
		if (query === window.location.search.replace(/^\?/, '')) return;

		// replaceState rather than pushState: the back button should leave the page
		// rather than walk back through every keystroke. `resolve()` keeps the path
		// correct under a base path; the cast just re-attaches the type a query
		// string strips off.
		const target = `${resolve('/restaurants')}${query ? `?${query}` : ''}` as ResolvedPathname;

		replaceState(target, {});
	});

	const select = (name: string | null) => {
		activeName = activeName === name ? null : name;
	};

	const locationLabel = (restaurant: Restaurant) => restaurant.locations.join('/');

	const directionsUrl = (restaurant: Restaurant) =>
		`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
			`${restaurant.name}, ${restaurant.locations[0]}, Utah`
		)}`;

	// When a map pin is clicked, bring its row into view.
	$effect(() => {
		const name = activeName;
		if (!name || !listElement) return;

		// The table and the card list both carry the attribute, but only one is
		// laid out at a time, so scroll whichever one is actually rendered.
		const rows = listElement.querySelectorAll<HTMLElement>(
			`[data-restaurant="${CSS.escape(name)}"]`
		);
		for (const row of rows) {
			if (row.offsetParent === null) continue;
			row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			break;
		}
	});

	const itemListSchema = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Favorite Restaurants in Salt Lake',
		description: 'Michael Bonner&rsquo;s favorite restaurants in and around Salt Lake City, Utah.',
		numberOfItems: restaurants.length,
		itemListElement: restaurants.map((restaurant, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			item: {
				'@type': 'Restaurant',
				name: restaurant.name,
				servesCuisine: restaurant.tags,
				priceRange: `$${restaurant.pricePerPerson} per person`,
				address: {
					'@type': 'PostalAddress',
					addressLocality: restaurant.locations[0],
					addressRegion: 'UT'
				},
				...(restaurant.lat != null && restaurant.lng != null
					? {
							geo: {
								'@type': 'GeoCoordinates',
								latitude: restaurant.lat,
								longitude: restaurant.lng
							}
						}
					: {})
			}
		}))
	});

	const labelClasses = classes.label;
	const inputClasses = classes.input;
</script>

<Seo
	title="Favorite Restaurants in Salt Lake | Michael Bonner"
	description="A sortable, filterable, mapped list of my favorite restaurants in and around Salt Lake City."
	ogImage="/og/restaurants.jpg"
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/restaurants" />
	<link rel="preconnect" href="https://a.basemaps.cartocdn.com" crossorigin="anonymous" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<${'script'} type="application/ld+json">${itemListSchema}</${'script'}>`}
</svelte:head>

<div class="container mx-auto px-6 sm:px-8">
	<header class="grid max-w-[58ch] gap-5 py-16 lg:py-24">
		<p class={classes.eyebrow}>Salt Lake City, Utah</p>
		<h1 class="text-h1 text-ink font-serif font-semibold">Favorite Restaurants in Salt Lake</h1>
		<p class="text-lead text-ink-muted font-serif">
			People ask me where to eat in Salt Lake often enough that I started keeping a list. Sort it,
			filter it, or find something near you on the map.
		</p>
	</header>

	<div class="border-rule grid gap-8 border-t pt-10 pb-8 xl:grid-cols-5">
		<!-- The map sticks alongside the list on wide screens and sits above it otherwise. -->
		<div class="xl:order-2 xl:col-span-2">
			<div class="xl:sticky xl:top-[calc(var(--header-height)+1rem)]">
				<RestaurantMap restaurants={visible} {activeName} onSelect={select} />
			</div>
		</div>

		<div class="xl:col-span-3">
			<div class={classNames(classes.surface, 'grid gap-4 p-5')}>
				<div class="grid gap-4 sm:grid-cols-2">
					<!--
						Labels sit beside their control rather than wrapping it: a <label> that
						wraps a <select> pulls every option into its accessible name.
					-->
					<div class="grid gap-1">
						<label for="restaurant-search" class={labelClasses}>Search</label>
						<input
							id="restaurant-search"
							type="search"
							bind:value={search}
							placeholder="Name, tag, location&hellip;"
							class={inputClasses}
						/>
					</div>

					<div class="grid gap-1">
						<label for="restaurant-tag" class={labelClasses}>Tag</label>
						<select id="restaurant-tag" bind:value={tag} class={inputClasses}>
							<option value="">Any tag</option>
							{#each restaurantTags as option (option)}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>

					<div class="grid gap-1">
						<label for="restaurant-location" class={labelClasses}>Location</label>
						<select id="restaurant-location" bind:value={location} class={inputClasses}>
							<option value="">Any location</option>
							{#each locations as option (option)}
								<option value={option}>{option}</option>
							{/each}
						</select>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="grid gap-1">
							<label for="restaurant-price" class={labelClasses}>Price/person</label>
							<select id="restaurant-price" bind:value={pricePerPerson} class={inputClasses}>
								<option value={0}>Any</option>
								{#each pricesPerPerson as pricePoint (pricePoint)}
									<option value={pricePoint}>${pricePoint}</option>
								{/each}
							</select>
						</div>

						<div class="grid gap-1">
							<label for="restaurant-rating" class={labelClasses}>Rating</label>
							<select id="restaurant-rating" bind:value={minRating} class={inputClasses}>
								<option value={0}>Any</option>
								{#each ratingOptions as level (level)}
									<option value={level}>{level}{level !== 10 ? '+' : ''}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>

				<div class="border-rule flex flex-wrap items-center justify-between gap-4 border-t pt-4">
					<p aria-live="polite" class={classNames(classes.label, 'tabular-nums')}>
						Showing {visible.length} of {restaurants.length} restaurants
					</p>
					{#if hasFilters}
						<button
							type="button"
							onclick={clearFilters}
							class={classNames(classes.label, 'hover:text-accent cursor-pointer')}
						>
							Clear filters
						</button>
					{/if}
				</div>

				<!-- Sorting on small screens, where there are no table headers to click. -->
				<div class="grid gap-1 md:hidden">
					<label for="restaurant-sort" class={labelClasses}>Sort by</label>
					<select
						id="restaurant-sort"
						class={inputClasses}
						value={`${sortKey}:${sortDirection}`}
						onchange={(event) => {
							const [key, direction] = event.currentTarget.value.split(':');
							sortKey = key as SortKey;
							sortDirection = direction === 'asc' ? 'asc' : 'desc';
						}}
					>
						<option value="rating:desc">Rating, high to low</option>
						<option value="rating:asc">Rating, low to high</option>
						<option value="pricePerPerson:asc">Price, low to high</option>
						<option value="pricePerPerson:desc">Price, high to low</option>
						<option value="name:asc">Name, A to Z</option>
						<option value="name:desc">Name, Z to A</option>
						<option value="tags:asc">Tags, A to Z</option>
						<option value="locations:asc">Location, A to Z</option>
					</select>
				</div>
			</div>

			<div bind:this={listElement} class="mt-8">
				{#if visible.length === 0}
					<p
						class={classNames(
							classes.surface,
							'text-lead text-ink-muted p-10 text-center font-serif'
						)}
					>
						No restaurants match those filters.
					</p>
				{:else}
					<!-- Table on md and up, cards below, so the columns never squeeze. -->
					<table class="hidden w-full border-collapse text-left md:table">
						<thead>
							<tr class="border-rule-strong border-b">
								{#each columns as column (column.key)}
									{@const isSorted = sortKey === column.key}
									<th
										scope="col"
										class={classNames('py-2', column.alignRight ? 'text-right' : '')}
										aria-sort={isSorted
											? sortDirection === 'asc'
												? 'ascending'
												: 'descending'
											: 'none'}
									>
										<button
											type="button"
											onclick={() => toggleSort(column.key)}
											class={classNames(
												classes.label,
												'hover:text-accent inline-flex cursor-pointer items-center gap-1',
												isSorted ? 'text-ink' : ''
											)}
										>
											<span>{column.label}</span>
											<span
												aria-hidden="true"
												class={classNames('text-[0.7em]', isSorted ? 'text-accent' : 'opacity-25')}
											>
												{isSorted && sortDirection === 'asc' ? '▲' : '▼'}
											</span>
										</button>
									</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each visible as restaurant (restaurant.name)}
								{@const isActive = activeName === restaurant.name}
								<tr
									data-restaurant={restaurant.name}
									onclick={() => select(restaurant.name)}
									class={classNames(
										'border-rule cursor-pointer border-b align-top transition-colors duration-150',
										isActive ? 'bg-accent-soft' : 'hover:bg-ground-sunken'
									)}
								>
									<td class="py-3 pr-4">
										<div class="flex items-start gap-3">
											<!--
												Kept small deliberately. The table shares its row with the map, so
												every pixel the thumbnail takes comes out of the name column and
												wraps more of the longer names onto a second line.
											-->
											<RestaurantThumbnail name={restaurant.name} size={40} />

											<div>
												<!--
													The row is clickable for the mouse, but the name is a real button so
													the same selection is reachable by keyboard and announced to screen
													readers. It stops propagation so the row handler cannot undo it.
												-->
												<button
													type="button"
													aria-pressed={isActive}
													onclick={(event) => {
														event.stopPropagation();
														select(restaurant.name);
													}}
													class={classNames(
														'cursor-pointer text-left font-serif text-[1.0625rem] font-medium',
														'hover:text-accent transition-colors duration-150',
														isActive ? 'text-accent' : 'text-ink'
													)}
												>
													{restaurant.name}
												</button>
												{#if restaurant.notes}
													<span class={classNames(classes.label, 'block')}>
														{restaurant.notes}
													</span>
												{/if}
												<span class="mt-1 flex flex-wrap gap-x-3">
													<a
														href={directionsUrl(restaurant)}
														target="_blank"
														rel="noopener noreferrer"
														class={classNames(classes.label, 'hover:text-accent')}
														onclick={(event) => event.stopPropagation()}
													>
														Directions
													</a>
												</span>
											</div>
										</div>
									</td>
									<td class="text-ui text-ink-muted py-3 pr-4 font-sans">
										{restaurant.tags.join(', ')}
									</td>
									<td class="text-ui text-ink-muted py-3 pr-4 font-sans">
										{locationLabel(restaurant)}
									</td>
									<td class="text-ui py-3 pr-4 text-right font-sans whitespace-nowrap tabular-nums">
										${restaurant.pricePerPerson}
									</td>
									<td
										class="text-ui py-3 text-right font-sans font-medium whitespace-nowrap tabular-nums"
									>
										{restaurant.rating}/10
									</td>
								</tr>
							{/each}
						</tbody>
					</table>

					<ul class="grid gap-4 md:hidden">
						{#each visible as restaurant (restaurant.name)}
							{@const isActive = activeName === restaurant.name}
							<li
								data-restaurant={restaurant.name}
								class={classNames(
									'rounded-xl border p-4 transition-colors duration-150',
									isActive ? 'border-accent-bright bg-accent-soft' : 'border-rule bg-surface'
								)}
							>
								<div class="flex items-start gap-4">
									<!--
										Bigger than the table's thumbnail: a card has the full width to
										itself, so the photo is not competing with four other columns.
									-->
									<RestaurantThumbnail name={restaurant.name} size={64} />

									<!-- min-w-0 so a long name wraps instead of stretching the card. -->
									<div class="min-w-0">
										<button
											type="button"
											onclick={() => select(restaurant.name)}
											class="text-h3 text-ink w-full cursor-pointer text-left font-serif font-medium"
										>
											{restaurant.name}
										</button>
										<!--
											wrap-anywhere because a slashed location list ("Downtown/Sugarhouse/
											Midvale") is one unbreakable word to the browser. With the thumbnail
											beside it, that word set the card's minimum width and pushed the whole
											page into a horizontal scroll on a 320px screen.
										-->
										<p class="text-ui text-ink-muted font-sans wrap-anywhere">
											{restaurant.tags.join(', ')} &middot; {locationLabel(restaurant)} &middot; ${restaurant.pricePerPerson}/person
											&middot; {restaurant.rating}/10
										</p>
										{#if restaurant.notes}
											<p class={classes.label}>{restaurant.notes}</p>
										{/if}
										<p class="mt-2 flex flex-wrap gap-x-4">
											<a
												href={directionsUrl(restaurant)}
												target="_blank"
												rel="noopener noreferrer"
												class={classNames(classes.label, 'hover:text-accent')}
											>
												Directions
											</a>
										</p>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
</div>
