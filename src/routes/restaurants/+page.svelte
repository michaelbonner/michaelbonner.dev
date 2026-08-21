<script lang="ts">
	import Seo from '../../components/Seo.svelte';
	import RestaurantMap from '../../components/RestaurantMap.svelte';
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

	let search = $state('');
	let tag = $state('');
	let location = $state('');
	let pricePerPerson = $state(0);
	let minRating = $state(0);
	let sortKey = $state<SortKey>('rating');
	let sortDirection = $state<SortDirection>('desc');
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
		search = '';
		tag = '';
		location = '';
		pricePerPerson = 0;
		minRating = 0;
	};

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

	const labelClasses = 'text-sm text-gray-700 dark:text-gray-300';

	const inputClasses = classNames(
		'w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-lg',
		'focus:border-blue-600 focus:ring-2 focus:ring-blue-600/40 focus:outline-none',
		'dark:border-gray-600 dark:bg-gray-900'
	);
</script>

<Seo
	title="Favorite Restaurants in Salt Lake | Michael Bonner"
	description="A sortable, filterable, mapped list of my favorite restaurants in and around Salt Lake City."
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/restaurants" />
	<link rel="preconnect" href="https://a.basemaps.cartocdn.com" crossorigin="anonymous" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<${'script'} type="application/ld+json">${itemListSchema}</${'script'}>`}
</svelte:head>

<div class="container mx-auto px-8 py-12">
	<h1 class="text-4xl lg:text-6xl">Favorite Restaurants in Salt Lake</h1>
	<p class="mt-6 max-w-2xl text-xl text-gray-700 dark:text-gray-300">
		People ask me where to eat in Salt Lake often enough that I started keeping a list. Sort it,
		filter it, or find something near you on the map.
	</p>

	<div class="mt-12 grid gap-8 xl:grid-cols-5">
		<!-- The map sticks alongside the list on wide screens and sits above it otherwise. -->
		<div class="xl:order-2 xl:col-span-2">
			<div class="xl:sticky xl:top-8">
				<RestaurantMap restaurants={visible} {activeName} onSelect={select} />
			</div>
		</div>

		<div class="xl:col-span-3">
			<div class="grid gap-4">
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
								{#each [10, 9, 8] as level (level)}
									<option value={level}>{level}+</option>
								{/each}
							</select>
						</div>
					</div>
				</div>

				<div class="flex flex-wrap items-center justify-between gap-4">
					<p aria-live="polite" class="text-gray-700 dark:text-gray-300">
						Showing {visible.length} of {restaurants.length} restaurants
					</p>
					{#if hasFilters}
						<button type="button" onclick={clearFilters} class={classes.bodyLink}>
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
					<p class="rounded-lg border border-gray-300 p-8 text-center text-xl dark:border-gray-600">
						No restaurants match those filters.
					</p>
				{:else}
					<!-- Table on md and up, cards below, so the columns never squeeze. -->
					<table class="hidden w-full border-collapse text-left md:table">
						<thead>
							<tr class="border-b-2 border-gray-400 dark:border-gray-600">
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
												'inline-flex items-center gap-1 font-semibold',
												'hover:text-blue-800 dark:hover:text-blue-300'
											)}
										>
											<span>{column.label}</span>
											<span aria-hidden="true" class={isSorted ? '' : 'opacity-30'}>
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
										'cursor-pointer border-b border-gray-300 align-top dark:border-gray-700',
										isActive
											? 'bg-blue-100 dark:bg-blue-950'
											: 'hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
									)}
								>
									<td class="py-3 pr-4">
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
											class="text-left text-lg hover:text-blue-800 dark:hover:text-blue-300"
										>
											{restaurant.name}
										</button>
										{#if restaurant.notes}
											<span class="block text-sm text-gray-600 dark:text-gray-400">
												{restaurant.notes}
											</span>
										{/if}
										<span class="mt-1 flex flex-wrap gap-x-3 text-sm">
											<a
												href={directionsUrl(restaurant)}
												target="_blank"
												rel="noopener noreferrer"
												class={classes.bodyLink}
												onclick={(event) => event.stopPropagation()}
											>
												Directions
											</a>
										</span>
									</td>
									<td class="py-3 pr-4">{restaurant.tags.join(', ')}</td>
									<td class="py-3 pr-4">{locationLabel(restaurant)}</td>
									<td class="py-3 pr-4 text-right whitespace-nowrap">
										${restaurant.pricePerPerson}
									</td>
									<td class="py-3 text-right whitespace-nowrap">{restaurant.rating}/10</td>
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
									'rounded-lg border p-4',
									isActive
										? 'border-blue-800 bg-blue-100 dark:border-blue-300 dark:bg-blue-950'
										: 'border-gray-300 dark:border-gray-700'
								)}
							>
								<button
									type="button"
									onclick={() => select(restaurant.name)}
									class="w-full text-left text-xl"
								>
									{restaurant.name}
								</button>
								<p class="text-gray-700 dark:text-gray-300">
									{restaurant.tags.join(', ')} &middot; {locationLabel(restaurant)} &middot; ${restaurant.pricePerPerson}/person
									&middot; {restaurant.rating}/10
								</p>
								{#if restaurant.notes}
									<p class="text-sm text-gray-600 dark:text-gray-400">{restaurant.notes}</p>
								{/if}
								<p class="mt-2 flex flex-wrap gap-x-4">
									<a
										href={directionsUrl(restaurant)}
										target="_blank"
										rel="noopener noreferrer"
										class={classes.bodyLink}
									>
										Directions
									</a>
								</p>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
</div>
