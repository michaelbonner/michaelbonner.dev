/**
 * Generates the custom Open Graph card for every page listed in og-images.config.js.
 *
 * Renders an HTML template in headless Chromium at 2x, then downscales to a
 * 1200x630 JPEG in static/og/. Fonts and photos are inlined as data URIs so the
 * output only depends on files in this repo.
 *
 * Usage: bun run og
 *        bun run og home blog   (only regenerate those cards)
 */

import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { cards } from './og-images.config.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(root, 'static/og');

const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2;

// Full-bleed photo panel on the right of a "panel" card
const PANEL_WIDTH = 560;
// Rounded screenshot card on the right of a "thumb" card
const THUMB_WIDTH = 400;
const THUMB_HEIGHT = 270;

const HEADSHOT = 'src/lib/images/on-the-beach.jpg';
// Square crop around the face in the source photo (2066x1378)
const HEADSHOT_CROP = { left: 412, top: 168, width: 520, height: 520 };

const GRAVITY = {
	top: 'north',
	bottom: 'south',
	left: 'west',
	right: 'east',
	center: 'centre'
};

const dataUri = (mime, buffer) => `data:${mime};base64,${buffer.toString('base64')}`;

const loadFont = async (file) =>
	dataUri(
		'font/woff2',
		await readFile(resolve(root, `node_modules/@fontsource-variable/newsreader/files/${file}`))
	);

/** Cover-crops a card image to its slot and returns it as an inlined JPEG. */
const loadCardImage = async ({ image, imageStyle, imageFocus = 'center' }) => {
	const file = resolve(root, image);
	if (!existsSync(file)) throw new Error(`Missing OG card image: ${image}`);

	const [width, height] =
		imageStyle === 'thumb' ? [THUMB_WIDTH, THUMB_HEIGHT] : [PANEL_WIDTH, HEIGHT];

	const buffer = await sharp(file)
		.resize({
			width: width * SCALE,
			height: height * SCALE,
			fit: 'cover',
			position: GRAVITY[imageFocus] ?? 'centre'
		})
		.jpeg({ quality: 92 })
		.toBuffer();

	return dataUri('image/jpeg', buffer);
};

const loadHeadshot = async () =>
	dataUri(
		'image/jpeg',
		await sharp(resolve(root, HEADSHOT))
			.extract(HEADSHOT_CROP)
			.resize(104, 104)
			.jpeg({ quality: 92 })
			.toBuffer()
	);

const template = ({ fonts, headshot, card, cardImage }) => {
	const style = card.image ? (card.imageStyle ?? 'panel') : 'plain';

	return `<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<style>
			@font-face {
				font-family: 'Newsreader';
				font-style: normal;
				font-weight: 200 800;
				src: url(${fonts.normal}) format('woff2');
			}
			@font-face {
				font-family: 'Newsreader';
				font-style: italic;
				font-weight: 200 800;
				src: url(${fonts.italic}) format('woff2');
			}

			* {
				margin: 0;
				padding: 0;
				box-sizing: border-box;
			}

			body {
				width: ${WIDTH}px;
				height: ${HEIGHT}px;
				overflow: hidden;
				font-family: 'Newsreader', serif;
				color: #fff;
				background: #0b1220;
				-webkit-font-smoothing: antialiased;
			}

			.card {
				position: relative;
				width: 100%;
				height: 100%;
			}

			/* The site's dark gradient. On photo cards its right edge is masked away,
			   which dissolves the photo into the background with no visible seam. */
			.scrim {
				position: absolute;
				inset: 0;
				z-index: 2;
				background:
					radial-gradient(
						120% 130% at 100% 0%,
						rgba(99, 102, 241, 0.38) 0%,
						rgba(11, 18, 32, 0) 58%
					),
					linear-gradient(28deg, #0b1220 0%, #16203a 55%, #202c48 100%);
			}

			.card.has-panel .scrim {
				-webkit-mask-image: linear-gradient(
					90deg,
					#000 0%,
					#000 57%,
					rgba(0, 0, 0, 0.9) 67%,
					rgba(0, 0, 0, 0.45) 79%,
					rgba(0, 0, 0, 0.08) 93%,
					transparent 100%
				);
			}

			/* Accent rule across the top, echoing the site's blue links */
			.card::after {
				content: '';
				position: absolute;
				inset: 0 0 auto 0;
				height: 8px;
				background: linear-gradient(90deg, #60a5fa 0%, #818cf8 50%, #38bdf8 100%);
				z-index: 4;
			}

			.panel {
				position: absolute;
				inset: 0 0 0 ${WIDTH - PANEL_WIDTH}px;
				z-index: 1;
			}

			.panel img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.thumb {
				position: absolute;
				top: 50%;
				right: 68px;
				z-index: 4;
				width: ${THUMB_WIDTH}px;
				height: ${THUMB_HEIGHT}px;
				overflow: hidden;
				border: 1px solid rgba(191, 219, 254, 0.35);
				border-radius: 18px;
				transform: translateY(-50%) rotate(2deg);
				box-shadow: 0 32px 64px -20px rgba(2, 6, 23, 0.85);
			}

			.thumb img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			.content {
				position: relative;
				z-index: 3;
				display: flex;
				flex-direction: column;
				height: 100%;
				width: ${style === 'panel' ? `${WIDTH - PANEL_WIDTH + 240}px` : '100%'};
				padding: 66px 72px 58px;
			}

			.eyebrow {
				font-size: 21px;
				font-weight: 500;
				letter-spacing: 0.2em;
				text-transform: uppercase;
				color: #93c5fd;
			}

			.headline {
				display: flex;
				flex: 1;
				flex-direction: column;
				justify-content: center;
				gap: 20px;
				padding: 30px 0;
				max-width: ${style === 'plain' ? '900px' : '620px'};
			}

			h1 {
				font-size: 68px;
				font-weight: 600;
				line-height: 1.07;
				letter-spacing: -0.015em;
				text-wrap: balance;
			}

			.description {
				font-size: 27px;
				font-weight: 300;
				line-height: 1.42;
				color: #cbd5e1;
				text-wrap: pretty;
			}

			.footer {
				display: flex;
				align-items: center;
				gap: 18px;
				border-top: 1px solid rgba(148, 163, 184, 0.28);
				padding-top: 24px;
			}

			.footer img {
				width: 52px;
				height: 52px;
				border-radius: 999px;
				object-fit: cover;
				box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.55);
			}

			.wordmark {
				font-size: 26px;
				font-weight: 500;
			}

			.meta {
				margin-left: auto;
				font-size: 21px;
				font-style: italic;
				font-weight: 300;
				color: #94a3b8;
			}
		</style>
	</head>
	<body>
		<div class="card ${style === 'panel' ? 'has-panel' : ''}">
			${style === 'panel' ? `<div class="panel"><img src="${cardImage}" alt="" /></div>` : ''}
			<div class="scrim"></div>
			${style === 'thumb' ? `<div class="thumb"><img src="${cardImage}" alt="" /></div>` : ''}
			<div class="content">
				<div class="eyebrow">${card.eyebrow}</div>
				<div class="headline">
					<h1>${card.title}</h1>
					${card.description ? `<p class="description">${card.description}</p>` : ''}
				</div>
				<div class="footer">
					<img src="${headshot}" alt="" />
					<span class="wordmark">michaelbonner.dev</span>
					${card.meta ? `<span class="meta">${card.meta}</span>` : ''}
				</div>
			</div>
		</div>
	</body>
</html>`;
};

/** Shrinks the title (then the description) until the card no longer overflows. */
const fitText = () => {
	const headline = document.querySelector('.headline');
	const h1 = document.querySelector('h1');
	const description = document.querySelector('.description');

	const overflows = () => headline.scrollHeight > headline.clientHeight;

	for (let size = 68; size >= 40 && overflows(); size -= 2) {
		h1.style.fontSize = `${size}px`;
	}

	if (description) {
		for (let size = 27; size >= 20 && overflows(); size -= 1) {
			description.style.fontSize = `${size}px`;
		}
	}

	return { titleSize: h1.style.fontSize || '68px', overflowing: overflows() };
};

const run = async () => {
	const only = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
	const selected = only.length ? cards.filter((card) => only.includes(card.name)) : cards;

	if (!selected.length) {
		console.error(`No cards matched: ${only.join(', ')}`);
		process.exit(1);
	}

	await mkdir(outputDir, { recursive: true });

	const fonts = {
		normal: await loadFont('newsreader-latin-wght-normal.woff2'),
		italic: await loadFont('newsreader-latin-wght-italic.woff2')
	};
	const headshot = await loadHeadshot();

	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: WIDTH, height: HEIGHT },
		deviceScaleFactor: SCALE
	});

	for (const card of selected) {
		const cardImage = card.image ? await loadCardImage(card) : null;

		await page.setContent(template({ fonts, headshot, card, cardImage }), { waitUntil: 'load' });
		await page.evaluate(() => document.fonts.ready);
		const fit = await page.evaluate(fitText);

		if (fit.overflowing) {
			console.warn(`  ! "${card.title}" still overflows at ${fit.titleSize} — shorten the copy`);
		}

		const jpeg = await sharp(await page.screenshot({ type: 'png' }))
			.resize(WIDTH, HEIGHT)
			.jpeg({ quality: 86, progressive: true, mozjpeg: true })
			.toBuffer();

		await writeFile(resolve(outputDir, `${card.name}.jpg`), jpeg);
		console.log(
			`  ✓ static/og/${card.name}.jpg  (${card.route}, ${Math.round(jpeg.length / 1024)}kb)`
		);
	}

	await browser.close();
	console.log(`\nGenerated ${selected.length} Open Graph image(s).`);
};

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
