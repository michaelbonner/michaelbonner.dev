<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/newsreader';
	import '@fontsource-variable/public-sans';

	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { partytownSnippet } from '@qwik.dev/partytown/integration';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';
	import { resolve } from '$app/paths';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const mainNav = [
		{ label: 'Home', href: resolve('/') },
		{ label: 'Blog', href: resolve('/blog') },
		{ label: 'Contact', href: resolve('/contact') }
	];

	const footerNav = [
		{ label: 'Home', href: resolve('/') },
		{ label: 'Blog', href: resolve('/blog') },
		{ label: 'Uses', href: resolve('/uses') },
		{ label: 'Favorite Restaurants', href: resolve('/restaurants') },
		{ label: 'Patents', href: resolve('/patents') },
		{ label: 'Policies', href: resolve('/policies') },
		{ label: 'Contact', href: resolve('/contact') }
	];

	// The home link should only light up on home itself; every other section
	// link also covers its child routes, so a blog post still marks "Blog".
	const isCurrent = (href: string) =>
		href === resolve('/') ? page.url.pathname === href : page.url.pathname.startsWith(href);

	onMount(() => {
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
	<meta name="theme-color" content="#faf6f2" />
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

<div class="bg-ground text-ink flex min-h-screen flex-col">
	<!--
		A hairline under the header is the only separation it needs; the old version
		floated the wordmark and nav on the same field as the page content with no
		edge at all. Sticky with a translucent ground so long pages keep the nav.
	-->
	<header
		class={classNames(
			'border-rule sticky top-0 z-30 border-b',
			'bg-ground/85 supports-[not(backdrop-filter:blur(0))]:bg-ground backdrop-blur-sm'
		)}
	>
		<div class="container mx-auto flex items-baseline justify-between gap-6 px-6 py-4 sm:px-8">
			<a
				href={resolve('/')}
				class={classNames(
					'text-ink font-serif text-xl font-semibold tracking-tight no-underline sm:text-2xl',
					'hover:text-accent transition-colors duration-150 ease-out'
				)}
			>
				Michael Bonner
			</a>
			<nav class="flex items-baseline gap-5 sm:gap-7" aria-label="Main">
				{#each mainNav as item (item.href)}
					<a
						href={item.href}
						class={classes.menuItem}
						aria-current={isCurrent(item.href) ? 'page' : undefined}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
	</header>

	<main class="flex-1">
		{@render children_render?.()}
	</main>

	<footer class="border-rule bg-ground-sunken mt-24 border-t">
		<div class="container mx-auto grid gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[1fr_auto]">
			<div class="grid max-w-md gap-3">
				<p class="text-h3 text-ink font-serif font-semibold">Michael Bonner</p>
				<p class="text-ui text-ink-muted font-sans">
					Web developer in Salt Lake City, Utah. Building websites, web apps, and mobile apps since
					2003.
				</p>
			</div>

			<nav
				class="grid gap-x-10 gap-y-3 self-start sm:grid-cols-2 lg:justify-items-end"
				aria-label="Footer"
			>
				{#each footerNav as item (item.href)}
					<a
						href={item.href}
						class={classes.menuItem}
						aria-current={isCurrent(item.href) ? 'page' : undefined}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<div class="border-rule border-t">
			<div class="container mx-auto px-6 py-6 sm:px-8">
				<p class="text-ui-sm text-ink-faint font-sans">
					&copy; 2021&ndash;{new Date().getFullYear()} Michael Bonner
				</p>
			</div>
		</div>
	</footer>
</div>
