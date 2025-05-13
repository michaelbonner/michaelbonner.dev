<script lang="ts">
	import '../app.css';

	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { PUBLIC_POSTHOG_API_KEY } from '$env/static/public';
	import { partytownSnippet } from '@qwik.dev/partytown/integration';
	import posthog from 'posthog-js';
	import { onDestroy, onMount } from 'svelte';
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';

	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		const meta = document.querySelector('meta[name="theme-color"]');
		let hue = 208;

		interval = setInterval(() => {
			meta?.setAttribute('content', `hsl(${(hue -= 1)}, 50%, 30%)`);
		}, 100);

		document.querySelectorAll('link[rel="preload"]').forEach((link) => {
			link.setAttribute('rel', 'stylesheet');
		});
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const load = async () => {
		if (browser) {
			posthog.init(PUBLIC_POSTHOG_API_KEY, {
				api_host: 'https://michaelbonner.dev/ingest',
				capture_pageleave: false,
				capture_pageview: false,
				ui_host: 'https://us.posthog.com'
			});
		}
		return;
	};
	load();

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'));
		afterNavigate(() => posthog.capture('$pageview'));
	}
</script>

<svelte:head>
	<meta name="theme-color" content="hsl(208, 50%, 30%)" />
	<meta property="og:url" content={`https://michaelbonner.dev${page.url.pathname}`} />
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

	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="preload"
		href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500&display=swap"
		as="style"
	/>

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
</svelte:head>

<div
	class={classNames(
		'font-serif bg-gray-200 text-gray-800 min-h-screen bg-opacity-80',
		'dark:bg-gray-800 dark:text-gray-200 dark:bg-opacity-70'
	)}
>
	<header class="container flex justify-between px-8 pt-12 mx-auto">
		<a href="/" class={classNames('lg:text-3xl', classes.menuItem)}> Michael Bonner </a>
		<nav class="flex justify-end space-x-6 text-xl" aria-label="Main">
			<a href="/" class={classes.menuItem}>Home</a>
			<a href="/blog" class={classes.menuItem}>Blog</a>
		</nav>
	</header>

	<slot />

	<footer class="container justify-between p-8 mx-auto lg:flex lg:flex-row-reverse lg:items-center">
		<nav
			class="flex justify-center pb-8 space-x-6 text-xl lg:justify-end lg:py-0"
			aria-label="Footer"
		>
			<a href="/" class={classes.menuItem}>Home</a>
			<a href="/blog" class={classes.menuItem}>Blog</a>
			<a href="/uses" class={classes.menuItem}>Uses</a>
			<a href="/policies" class={classes.menuItem}>Policies</a>
		</nav>
		<p class="flex flex-wrap gap-x-4 gap-y-6 justify-center items-end md:gap-y-2 lg:justify-start">
			<span class="text-center">
				&copy; 2021-{new Date().getFullYear()} by Michael Bonner.&nbsp;
				<a
					class={classNames(classes.menuItem, 'text-sm inline-block')}
					href="https://github.com/michaelbonner/michaelbonner.dev"
				>
					Check out the source for this site
				</a>
				.
			</span>
		</p>
	</footer>
</div>
