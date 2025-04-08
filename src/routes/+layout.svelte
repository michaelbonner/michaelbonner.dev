<script lang="ts">
	import '../app.css';

	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { PUBLIC_POSTHOG_API_KEY } from '$env/static/public';
	import posthog from 'posthog-js';
	import { onDestroy, onMount } from 'svelte';
	import Gtm from '../components/gtm.svelte';
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let interval: any;

	const gtmId = 'GTM-PCQSF3Z';
	const gtmDataPoints: string[] = [];

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

	export const load = async () => {
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

<Gtm {gtmId} {gtmDataPoints} />

<svelte:head>
	<meta name="theme-color" content="hsl(208, 50%, 30%)" />
	<link rel="icon" href="/favicon.ico" />
	<meta property="og:url" content={`https://michaelbonner.dev${page.url.pathname}`} />
	<meta name="author" content="Michael Bonner" />
	<meta property="profile:first_name" content="Michael" />
	<meta property="profile:last_name" content="Bonner" />
	<meta property="profile:username" content="michaelbonner" />
	<meta property="fb:app_id" content="383758763158159" />
	<link rel="apple-touch-icon" href="https://michaelbonner.dev/icon.png" />

	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="preload"
		href="https://fonts.googleapis.com/css2?family=Newsreader:wght@400;500&display=swap"
		as="style"
	/>
</svelte:head>

<div
	class={classNames(
		'font-serif bg-gray-200 text-gray-800 min-h-screen bg-opacity-80',
		'dark:bg-gray-800 dark:text-gray-200 dark:bg-opacity-70'
	)}
>
	<header class="container flex justify-between px-8 pt-12 mx-auto">
		<a href={`/`} class={classNames('lg:text-3xl', classes.menuItem)}> Michael Bonner </a>
		<nav class="flex justify-end space-x-6 text-xl" aria-label="Main">
			<a href={`/`} class={classes.menuItem}>Home</a>
			<a href="/blog" class={classes.menuItem}>Blog</a>
		</nav>
	</header>

	{@render children?.()}

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
				&copy; 2021-{new Date().getFullYear()} by Michael Bonner.{' '}
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
