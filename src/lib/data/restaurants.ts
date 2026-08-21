// The import attribute keeps this loadable by plain Node (the Playwright runner)
// as well as by Vite.
import coordinates from './restaurantCoordinates.json' with { type: 'json' };

export type RestaurantEntry = {
	/** Restaurant name, used as the stable key throughout the UI and to look up coordinates. */
	name: string;
	/** Categories from the source list. Every restaurant has at least one. */
	tags: [string, ...string[]];
	/** Personal rating on the source list's 10-point scale. */
	rating: number;
	notes?: string;
	/** Approximate cost in dollars for one person. */
	pricePerPerson: number;
	/** Neighborhoods or cities where the restaurant has a location. */
	locations: [string, ...string[]];
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
const entries = [
	{
		name: 'Antica Sicilia',
		tags: ['Italian'],
		rating: 9,
		pricePerPerson: 50,
		locations: ['Millcreek']
	},
	{
		name: 'Blacksmith Ice Cream',
		tags: ['Ice Cream'],
		rating: 9,
		pricePerPerson: 5,
		locations: ['Millcreek', 'Midvale']
	},
	{
		name: 'Bricks Corner',
		tags: ['Pizza'],
		rating: 9,
		notes: 'Detroit style',
		pricePerPerson: 20,
		locations: ['Downtown']
	},
	{
		name: "Caffe d'Bolla",
		tags: ['Coffee'],
		rating: 10,
		pricePerPerson: 10,
		locations: ['Downtown']
	},
	{
		name: 'Chanon Thai Cafe',
		tags: ['Thai'],
		rating: 9,
		pricePerPerson: 20,
		locations: ['Downtown']
	},
	{
		name: "Dave's Hot Chicken",
		tags: ['Chicken'],
		rating: 8,
		pricePerPerson: 15,
		locations: ['Midvale']
	},
	{
		name: 'Dolcetti Gelato',
		tags: ['Ice Cream'],
		rating: 9,
		pricePerPerson: 10,
		locations: ['Sugarhouse']
	},
	{
		name: "Frankie's Pizza and Pasta",
		tags: ['Pizza'],
		rating: 10,
		notes: 'New York style',
		pricePerPerson: 10,
		locations: ['Murray']
	},
	{
		name: 'Ganesh',
		tags: ['Indian'],
		rating: 9,
		pricePerPerson: 20,
		locations: ['Midvale']
	},
	{
		name: 'Grove Market and Deli',
		tags: ['Sandwich'],
		rating: 8,
		pricePerPerson: 10,
		locations: ['South Salt Lake']
	},
	{
		name: 'Honolulu Grill',
		tags: ['Hawaiian'],
		rating: 8,
		pricePerPerson: 15,
		locations: ['West Jordan']
	},
	{
		name: 'Jinya',
		tags: ['Ramen'],
		rating: 8,
		pricePerPerson: 15,
		locations: ['Sugarhouse', 'Murray']
	},
	{
		name: 'La Yaquesita',
		tags: ['Mexican'],
		rating: 8,
		pricePerPerson: 10,
		locations: ['Midvale']
	},
	{
		name: 'Laziz Kitchen',
		tags: ['Mediterranean'],
		rating: 8,
		pricePerPerson: 20,
		locations: ['Downtown', 'Midvale']
	},
	{
		name: 'Lucky 13',
		tags: ['Burger'],
		rating: 8,
		pricePerPerson: 15,
		locations: ['South Salt Lake']
	},
	{
		name: 'Nomad East',
		tags: ['Pizza'],
		rating: 8,
		pricePerPerson: 20,
		locations: ['Sugarhouse']
	},
	{
		name: 'Osteria Amore',
		tags: ['Italian'],
		rating: 9,
		pricePerPerson: 50,
		locations: ['Downtown']
	},
	{
		name: 'Paradise Biryani Pointe',
		tags: ['Indian'],
		rating: 9,
		pricePerPerson: 20,
		locations: ['Draper']
	},
	{
		name: 'Patty Shack',
		tags: ['Burger'],
		rating: 9,
		pricePerPerson: 15,
		locations: ['Murray']
	},
	{
		name: 'Phở 777',
		tags: ['Vietnamese'],
		rating: 8,
		pricePerPerson: 15,
		locations: ['West Valley']
	},
	{
		name: 'Pretty Bird',
		tags: ['Chicken'],
		rating: 9,
		pricePerPerson: 20,
		locations: ['Downtown', 'Sugarhouse', 'Midvale']
	},
	{
		name: 'Proper Burger',
		tags: ['Burger'],
		rating: 8,
		pricePerPerson: 15,
		locations: ['Downtown']
	},
	{
		name: 'Red Iguana',
		tags: ['Mexican'],
		rating: 8,
		pricePerPerson: 20,
		locations: ['Downtown']
	},
	{
		name: 'Sauce Boss Southern Kitchen',
		tags: ['Comfort Food'],
		rating: 9,
		notes: 'So good!',
		pricePerPerson: 20,
		locations: ['Draper']
	},
	{
		name: 'Sawadee',
		tags: ['Thai'],
		rating: 8,
		pricePerPerson: 20,
		locations: ['Downtown']
	},
	{
		name: 'Settebello',
		tags: ['Pizza'],
		rating: 9,
		notes: 'My favorite pizza in Utah',
		pricePerPerson: 20,
		locations: ['Downtown']
	},
	{
		name: 'Takashi',
		tags: ['Sushi'],
		rating: 9,
		pricePerPerson: 50,
		locations: ['Downtown']
	},
	{
		name: 'Vertical diner',
		tags: ['Diner', 'Vegan'],
		rating: 8,
		pricePerPerson: 20,
		locations: ['Downtown']
	},
	{
		name: "Victor's pizza co",
		tags: ['Pizza'],
		rating: 8,
		pricePerPerson: 20,
		locations: ['South Salt Lake']
	},
	{
		name: 'Zhu Ting Ji 竹亭记',
		tags: ['Chinese'],
		rating: 8,
		pricePerPerson: 20,
		locations: ['Murray']
	}
] satisfies RestaurantEntry[];

const coordinatesByName: Record<string, { lat: number; lng: number }> = coordinates;

export const restaurants: Restaurant[] = entries.map((entry) => ({
	...entry,
	...coordinatesByName[entry.name]
}));

/** Sorted, de-duplicated list of every tag present in the data. */
export const restaurantTags = [
	...new Set(restaurants.flatMap((restaurant) => restaurant.tags))
].sort();

/** Sorted, de-duplicated list of every location present in the data. */
export const locations = [
	...new Set(restaurants.flatMap((restaurant) => restaurant.locations))
].sort();

/** Sorted, de-duplicated list of the source data's per-person price points. */
export const pricesPerPerson = [
	...new Set(restaurants.map((restaurant) => restaurant.pricePerPerson))
].sort((a, b) => a - b);
