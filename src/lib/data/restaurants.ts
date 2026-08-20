// The import attribute keeps this loadable by plain Node (the Playwright runner)
// as well as by Vite.
import coordinates from './restaurantCoordinates.json' with { type: 'json' };

export type RestaurantEntry = {
	/** Restaurant name, used as the stable key throughout the UI and to look up coordinates. */
	name: string;
	cuisine: string;
	neighborhood: string;
	/** Street address, used for the geocode script and the map popup. */
	address: string;
	/** 1&ndash;4, rendered as $ through $$$$. */
	price: 1 | 2 | 3 | 4;
	/** My rating, 1&ndash;5. */
	rating: number;
	/** Occasions this place is good for. Drives the tag filter. */
	goodFor: string[];
	/** What to order. */
	order?: string;
	website?: string;
	notes?: string;
};

/** A restaurant with its geocoded position merged in, as consumed by the page. */
export type Restaurant = RestaurantEntry & {
	/** Filled in by `bun run geocode`. Restaurants without coordinates are hidden from the map. */
	lat?: number;
	lng?: number;
};

/**
 * The source of truth for the list. Coordinates deliberately live in
 * `restaurantCoordinates.json` so `bun run geocode` can rewrite them without
 * touching this file.
 */
const entries: RestaurantEntry[] = [
	{
		name: 'Red Iguana',
		cuisine: 'Mexican',
		neighborhood: 'Downtown',
		address: '736 W North Temple, Salt Lake City, UT 84116',
		price: 2,
		rating: 5,
		goodFor: ['Dinner', 'Groups', 'Out-of-towners'],
		order: 'Mole Amarillo',
		website: 'https://rediguana.com/',
		notes: 'The wait is real. Put your name in and walk around the block.'
	},
	{
		name: 'Takashi',
		cuisine: 'Japanese',
		neighborhood: 'Downtown',
		address: '18 W Market St, Salt Lake City, UT 84101',
		price: 4,
		rating: 5,
		goodFor: ['Date Night', 'Dinner'],
		order: 'Whatever is on the fresh sheet',
		website: 'https://www.takashisushi.com/',
		notes: 'Best sushi in the state. Get there right when they open or plan to wait.'
	},
	{
		name: 'Pretty Bird',
		cuisine: 'Chicken',
		neighborhood: 'Downtown',
		address: '146 S Regent St, Salt Lake City, UT 84111',
		price: 1,
		rating: 4,
		goodFor: ['Lunch', 'Takeout'],
		order: 'Hot chicken sandwich, medium',
		website: 'https://prettybirdchicken.com/'
	},
	{
		name: 'Laziz Kitchen',
		cuisine: 'Lebanese',
		neighborhood: 'Central Ninth',
		address: '912 S Jefferson St, Salt Lake City, UT 84101',
		price: 2,
		rating: 4,
		goodFor: ['Lunch', 'Dinner', 'Vegetarian'],
		order: 'Muhammara and the chicken shawarma',
		website: 'https://lazizkitchen.com/'
	},
	{
		name: 'HSL',
		cuisine: 'New American',
		neighborhood: 'Central City',
		address: '418 E 200 S, Salt Lake City, UT 84111',
		price: 3,
		rating: 5,
		goodFor: ['Date Night', 'Dinner'],
		order: 'Whatever the seasonal vegetable plate is',
		website: 'https://hslrestaurant.com/'
	}
];

const coordinatesByName: Record<string, { lat: number; lng: number }> = coordinates;

export const restaurants: Restaurant[] = entries.map((entry) => ({
	...entry,
	...coordinatesByName[entry.name]
}));

/** Sorted, de-duplicated list of every cuisine present in the data. */
export const cuisines = [...new Set(restaurants.map((r) => r.cuisine))].sort();

/** Sorted, de-duplicated list of every neighborhood present in the data. */
export const neighborhoods = [...new Set(restaurants.map((r) => r.neighborhood))].sort();

/** Sorted, de-duplicated list of every `goodFor` tag present in the data. */
export const goodForTags = [...new Set(restaurants.flatMap((r) => r.goodFor))].sort();
