import type { Picture } from '@sveltejs/enhanced-img';

/**
 * Maps restaurant names to their photo. The photos are named by hand, so the
 * lookup is by normalized name rather than an exact match, with aliases for the
 * few files that were saved under a longer or shorter name than the list uses.
 *
 * Shared by the map (popups and hover previews) and the list, so a new photo only
 * ever has to be dropped into `src/lib/images/restaurants/`.
 *
 * The glob asks for `?enhanced`, so each photo comes back as a `Picture` with avif
 * and webp srcsets alongside the original jpeg. Thirty of these render at once on
 * the list, so the smaller formats are worth the extra markup.
 */
const imageModules = import.meta.glob<Picture>('/src/lib/images/restaurants/*.jpg', {
	eager: true,
	import: 'default',
	query: { enhanced: true }
});

const imageNameAliases: Record<string, string> = {
	frankies: 'frankie s pizza and pasta',
	'ganesh indian cuisine': 'ganesh',
	'pretty bird hot chicken': 'pretty bird',
	'proper burger company': 'proper burger'
};

const normalizeRestaurantName = (value: string) =>
	value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, ' ')
		.trim();

const imagesByName: Record<string, Picture> = {};
for (const [path, picture] of Object.entries(imageModules)) {
	const fileName = path.split('/').pop();
	if (!fileName) continue;

	const imageName = normalizeRestaurantName(fileName.replace(/\.[^.]+$/, ''));
	const restaurantName = imageNameAliases[imageName] ?? imageName;
	imagesByName[restaurantName] = picture;
}

/** The photo for a restaurant, or `undefined` when it does not have one yet. */
export const restaurantImage = (name: string): Picture | undefined =>
	imagesByName[normalizeRestaurantName(name)];
