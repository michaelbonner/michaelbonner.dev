<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import Gtm from '../components/gtm.svelte';
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';

	let interval: any;

	const gtmId = 'GTM-PCQSF3Z';
	const gtmDataPoints: string[] = [];

	onMount(() => {
		const meta = document.querySelector('meta[name="theme-color"]');
		let hue = 208;

		interval = setInterval(() => {
			meta?.setAttribute('content', `hsl(${(hue -= 1)}, 50%, 30%)`);
		}, 40);

		document.querySelectorAll('link[rel="preload"]').forEach((link) => {
			link.setAttribute('rel', 'stylesheet');
		});
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<Gtm {gtmId} {gtmDataPoints} />

<svelte:head>
	<meta name="theme-color" content="hsl(208, 50%, 30%)" />
	<link rel="icon" href="/favicon.ico" />
	<meta property="og:url" content={`https://michaelbonner.dev${$page.url.pathname}`} />
	<meta name="author" content="Michael Bonner" />
	<meta property="profile:first_name" content="Michael" />
	<meta property="profile:last_name" content="Bonner" />
	<meta property="profile:username" content="michaelbonner" />
	<meta property="fb:app_id" content="383758763158159" />
	<link rel="apple-touch-icon" href="https://michaelbonner.dev/icon.png" />

	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
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
	<header class="flex justify-between pt-12 px-8 container mx-auto">
		<a href={`/`} class={classNames('lg:text-3xl', classes.menuItem)}> Michael Bonner </a>
		<nav class="flex justify-end space-x-6 text-xl">
			<a href={`/`} class={classes.menuItem}>Home</a>
			<a href="/blog" class={classes.menuItem}>Blog</a>
		</nav>
	</header>

	<slot />

	<footer class="lg:flex lg:items-center lg:flex-row-reverse justify-between container mx-auto p-8">
		<nav class="flex justify-center lg:justify-end space-x-6 text-xl pb-8 lg:py-0">
			<a href="/" class={classes.menuItem}>Home</a>
			<a href="/blog" class={classes.menuItem}>Blog</a>
			<a href="/uses" class={classes.menuItem}>Uses</a>
			<a href="/policies" class={classes.menuItem}>Policies</a>
		</nav>
		<p class="justify-center lg:justify-start flex flex-wrap gap-x-4 gap-y-2">
			<span>
				&copy; {new Date().getFullYear()} by Michael Bonner.{' '}
				<a
					class={classNames(classes.menuItem, 'text-sm inline-block')}
					href="https://github.com/michaelbonner/michaelbonner.dev"
				>
					Check out the source for this site
				</a>
				.
			</span>
			<span>
				Photographer:{' '}
				<a class={classes.bodyLink} href="https://www.instagram.com/dallas.dean.photography/">
					Dallas Dean
				</a>
			</span>
		</p>
	</footer>
</div>
