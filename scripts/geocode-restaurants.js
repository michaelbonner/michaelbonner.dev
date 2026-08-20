/**
 * Geocodes every restaurant address in `src/lib/data/restaurants.ts` and writes the
 * results to `src/lib/data/restaurantCoordinates.json`, which is committed so the
 * site stays static.
 *
 *   bun run geocode          # only geocode restaurants missing coordinates
 *   bun run geocode --force  # re-geocode everything
 *
 * Uses Nominatim, which asks for no more than one request per second and a real
 * User-Agent. Both are honored below. Run this from a machine with network access.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const coordinatesPath = resolve(projectRoot, 'src/lib/data/restaurantCoordinates.json');

const USER_AGENT = 'michaelbonner.dev restaurant map (https://michaelbonner.dev)';
const RATE_LIMIT_MS = 1100;

const force = process.argv.includes('--force');

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/**
 * Nominatim does better with a plain "name, street, city, state" query than with a
 * full postal address, so the zip is dropped before searching.
 */
const buildQuery = (restaurant) => {
	const withoutZip = restaurant.address.replace(/\s+\d{5}(-\d{4})?$/, '');
	return `${restaurant.name}, ${withoutZip}`;
};

const geocode = async (query) => {
	const url = new URL('https://nominatim.openstreetmap.org/search');
	url.searchParams.set('q', query);
	url.searchParams.set('format', 'jsonv2');
	url.searchParams.set('limit', '1');

	const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
	if (!response.ok) {
		throw new Error(`Nominatim responded ${response.status} ${response.statusText}`);
	}

	const [match] = await response.json();
	if (!match) return null;

	return { lat: Number(match.lat), lng: Number(match.lon) };
};

const main = async () => {
	const { restaurants } = await import('../src/lib/data/restaurants.ts');

	const existing = force ? {} : JSON.parse(await readFile(coordinatesPath, 'utf8'));
	// Drop coordinates for restaurants that are no longer in the list, so replacing
	// the data does not leave orphaned entries behind.
	const currentNames = new Set(restaurants.map((restaurant) => restaurant.name));
	const results = {};
	const removed = [];
	for (const [name, position] of Object.entries(existing)) {
		if (currentNames.has(name)) results[name] = position;
		else removed.push(name);
	}

	const pending = restaurants.filter((restaurant) => !results[restaurant.name]);

	if (pending.length === 0 && removed.length === 0) {
		console.log('Every restaurant already has coordinates. Pass --force to re-geocode.');
		return;
	}

	if (removed.length > 0) {
		console.log(`Dropping ${removed.length} stale coordinate(s): ${removed.join(', ')}`);
	}

	if (pending.length > 0) {
		console.log(`Geocoding ${pending.length} restaurant(s)...`);
	}

	const failures = [];

	for (const [index, restaurant] of pending.entries()) {
		if (index > 0) await sleep(RATE_LIMIT_MS);

		const query = buildQuery(restaurant);
		try {
			const position = await geocode(query);
			if (position) {
				results[restaurant.name] = position;
				console.log(`  ✓ ${restaurant.name} → ${position.lat}, ${position.lng}`);
			} else {
				failures.push(restaurant.name);
				console.warn(`  ✗ ${restaurant.name} — no match for "${query}"`);
			}
		} catch (error) {
			failures.push(restaurant.name);
			console.warn(`  ✗ ${restaurant.name} — ${error.message}`);
		}
	}

	// Sort by name so the committed file produces stable, reviewable diffs.
	const sorted = Object.fromEntries(Object.entries(results).sort(([a], [b]) => a.localeCompare(b)));
	await writeFile(coordinatesPath, `${JSON.stringify(sorted, null, '\t')}\n`);

	console.log(`\nWrote ${Object.keys(sorted).length} coordinate(s) to ${coordinatesPath}`);

	if (failures.length > 0) {
		console.warn(
			`\n${failures.length} restaurant(s) could not be geocoded and will not appear on the map:\n` +
				failures.map((name) => `  - ${name}`).join('\n') +
				`\n\nAdd their lat/lng to restaurantCoordinates.json by hand, or tighten the address.`
		);
	}
};

await main();
