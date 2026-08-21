<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/newsreader';

	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { partytownSnippet } from '@qwik.dev/partytown/integration';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';
	import { classes } from '../styles/classes';
	import { resolve } from '$app/paths';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	onMount(() => {
		const meta = document.querySelector('meta[name="theme-color"]');
		meta?.setAttribute('content', 'oklch(0.65 0.205 33)');

		document.querySelectorAll('link[rel="preload"]').forEach((link) => {
			link.setAttribute('rel', 'stylesheet');
		});
	});

	if (browser && env.PUBLIC_POSTHOG_ENABLED !== 'false' && env.PUBLIC_POSTHOG_API_KEY) {
		posthog.init(env.PUBLIC_POSTHOG_API_KEY, {
			api_host: 'https://g.michaelbonner.dev',
			capture_pageleave: false,
			capture_pageview: false,
			defaults: '2026-05-30',
			ui_host: 'https://us.posthog.com'
		});

		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}

	const children_render = $derived(children);
</script>

<svelte:head>
	<meta name="theme-color" content="oklch(0.65 0.205 33)" />
	<meta name="color-scheme" content="light" />
	<meta property="og:url" content={`https://michaelbonner.dev${page.url.pathname}`} />
	<meta property="og:locale" content="en_US" />
	<meta name="author" content="Michael Bonner" />
	<meta property="profile:first_name" content="Michael" />
	<meta property="profile:last_name" content="Bonner" />
	<meta property="profile:username" content="michaelbonner" />
	<meta property="fb:app_id" content="383758763158159" />

	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />

	<script>
		// Forward the necessary functions to the web worker layer
		partytown = {
			forward: ['dataLayer.push', 'gtag']
		};
	</script>

	<!-- eslint-disable @typescript-eslint/no-unused-expressions -->
	<!-- eslint-disable svelte/no-at-html-tags -->
	{@html '<script>' + partytownSnippet() + '</script>'}
	<!-- eslint-enable svelte/no-at-html-tags -->
	<!-- eslint-enable @typescript-eslint/no-unused-expressions -->

	<script
		type="text/partytown"
		src="https://www.googletagmanager.com/gtag/js?id=GTM-PCQSF3Z"
	></script>
	<script type="text/partytown">
		window.dataLayer = window.dataLayer || [];
		window.gtag = function () {
			dataLayer.push(arguments);
		};
		gtag('js', new Date());
		gtag('config', 'GTM-PCQSF3Z');
	</script>

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Michael Bonner",
			"alternateName": "Mike Bonner",
			"url": "https://michaelbonner.dev/",
			"image": "https://michaelbonner.dev/images/on-the-beach-600.jpg",
			"jobTitle": "Web Developer",
			"worksFor": {
				"@type": "Organization",
				"name": "Bootpack Digital",
				"url": "https://bootpackdigital.com"
			},
			"address": {
				"@type": "PostalAddress",
				"addressLocality": "Salt Lake City",
				"addressRegion": "UT",
				"addressCountry": "US"
			},
			"email": "mailto:michaelbonner@michaelbonner.dev",
			"sameAs": [
				"https://github.com/michaelbonner",
				"https://www.linkedin.com/in/michaelbonner",
				"https://www.instagram.com/michael__bonner"
			],
			"description": "Web developer in Salt Lake City, Utah. Founder of Bootpack Digital. Building websites, web apps, and mobile apps since 2003.",
			"knowsAbout": [
				"JavaScript",
				"TypeScript",
				"React",
				"Svelte",
				"Node",
				"PHP",
				"AWS",
				"Serverless",
				"Next.js",
				"Gatsby",
				"GraphQL",
				"Prisma",
				"Apollo",
				"Laravel",
				"MongoDB",
				"MySQL",
				"PostgreSQL",
				"WordPress",
				"Shopify"
			],
			"hasOccupation": {
				"@type": "Occupation",
				"name": "Web Developer",
				"description": "Building websites, web apps, and mobile apps.",
				"estimatedSalary": [
					{
						"@type": "MonetaryAmountDistribution",
						"currency": "USD",
						"duration": "PT1H",
						"median": "120",
						"name": "Hourly Rate"
					}
				],
				"mainEntityOfPage": {
					"@type": "WebPage",
					"lastReviewed": "2025-08-26T14:20:00-06:00"
				},
				"occupationLocation": [
					{
						"@type": "City",
						"name": "Salt Lake City"
					}
				]
			},
			"memberOf": [
				{
					"@type": "Organization",
					"name": "Bootpack Digital"
				}
			],
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": "https://michaelbonner.dev/"
			},
			"makesOffer": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Web Development",
						"provider": {
							"@type": "Organization",
							"name": "Bootpack Digital"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Web Design",
						"provider": {
							"@type": "Organization",
							"name": "Bootpack Digital"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Digital Marketing",
						"provider": {
							"@type": "Organization",
							"name": "Bootpack Digital"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Software Consulting",
						"provider": {
							"@type": "Organization",
							"name": "Bootpack Digital"
						}
					}
				}
			]
		}
	</script>
</svelte:head>

<div class="bg-paper text-ink isolate min-h-dvh font-serif antialiased">
	<header
		class="bg-paper text-ink border-ink/15 mx-auto flex max-w-[90rem] items-center justify-between gap-4 border-b px-5 py-5 font-sans sm:px-8 lg:px-12"
	>
		<a
			aria-label="Homepage"
			href={resolve('/')}
			class="hover:text-tomato focus-visible:text-tomato text-xl font-semibold tracking-tight outline-none sm:text-lg"
		>
			Michael Bonner
		</a>
		<nav class="hidden items-center gap-6 font-sans lg:flex" aria-label="Main">
			<a href={resolve('/')} class={page.url.pathname === '/' ? 'text-tomato' : 'hover:text-tomato'}
				>Home</a
			>
			<a
				href={resolve('/blog')}
				class={page.url.pathname.startsWith('/blog') ? 'text-tomato' : 'hover:text-tomato'}>Blog</a
			>
			<a
				href={resolve('/contact')}
				class={page.url.pathname === '/contact' ? 'text-tomato' : 'hover:text-tomato'}>Contact</a
			>
		</nav>
		<details class="relative font-sans lg:hidden">
			<summary
				class="cursor-pointer list-none px-3 py-2 text-base font-semibold ring-1 ring-current"
				>Menu</summary
			>
			<nav
				class="bg-cream text-ink absolute top-12 right-0 z-50 grid min-w-48 gap-1 p-3 shadow-xl ring-1 ring-black/10"
				aria-label="Mobile"
			>
				<a class="px-3 py-2" href={resolve('/')}>Home</a>
				<a class="px-3 py-2" href={resolve('/blog')}>Blog</a>
				<a class="px-3 py-2" href={resolve('/contact')}>Contact</a>
			</nav>
		</details>
	</header>

	<main>
		{@render children_render?.()}
	</main>

	<footer
		class="bg-paper text-ink border-ink/15 mx-auto max-w-[90rem] justify-between gap-8 border-t p-8 font-sans lg:flex lg:flex-row-reverse lg:items-center lg:px-12"
	>
		<nav
			class="flex flex-wrap justify-center gap-6 pb-8 text-base sm:text-sm lg:justify-end lg:py-0"
			aria-label="Footer"
		>
			<a href={resolve('/')} class={classes.menuItem}>Home</a>
			<a href={resolve('/blog')} class={classes.menuItem}>Blog</a>
			<a href={resolve('/uses')} class={classes.menuItem}>Uses</a>
			<a href={resolve('/restaurants')} class={classes.menuItem}>Favorite Restaurants</a>
			<a href={resolve('/patents')} class={classes.menuItem}>Patents</a>
			<a href={resolve('/policies')} class={classes.menuItem}>Policies</a>
			<a href={resolve('/contact')} class={classes.menuItem}>Contact</a>
		</nav>
		<p class="flex flex-wrap items-end justify-center gap-x-4 gap-y-6 md:gap-y-2 lg:justify-start">
			<span>
				&copy; 2021&ndash;{new Date().getFullYear()} Michael Bonner.
			</span>
		</p>
	</footer>
</div>
