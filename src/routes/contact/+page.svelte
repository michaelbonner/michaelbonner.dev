<script lang="ts">
	import { enhance } from '$app/forms';
	import { env } from '$env/dynamic/public';
	import { Turnstile } from 'svelte-turnstile';
	import Seo from '../../components/Seo.svelte';
	import { classNames } from '../../functions/classNames';
	import Github from '../../icons/Github.svelte';
	import Instagram from '../../icons/Instagram.svelte';
	import LinkedIn from '../../icons/LinkedIn.svelte';
	import { classes } from '../../styles/classes';

	let { form } = $props();

	const socials = [
		{
			label: 'LinkedIn',
			handle: 'in/michaelbonner',
			href: 'https://www.linkedin.com/in/michaelbonner/',
			icon: LinkedIn
		},
		{
			label: 'GitHub',
			handle: 'michaelbonner',
			href: 'https://github.com/michaelbonner',
			icon: Github
		},
		{
			label: 'Instagram',
			handle: 'michael__bonner',
			href: 'https://www.instagram.com/michael__bonner',
			icon: Instagram
		}
	];
</script>

<Seo
	title="Contact | Michael Bonner"
	description="Get in touch with Michael Bonner, a full-stack developer in Salt Lake City, Utah."
	ogImage="/og/contact.jpg"
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/contact" />
</svelte:head>

<div class="container mx-auto px-6 sm:px-8">
	<header class="grid max-w-[52ch] gap-5 py-16 lg:py-24">
		<p class={classes.eyebrow}>Contact</p>
		<h1 class="text-h1 text-ink font-serif font-semibold">Get in touch</h1>
		<p class="text-lead text-ink-muted font-serif">
			Send a message and I&apos;ll get back to you, or find me on one of these platforms.
		</p>
	</header>

	<!--
		The form is the primary action, so it gets the wide column and the panel;
		the social links are a quieter fallback beside it.
	-->
	<div
		class="border-rule grid gap-12 border-t pt-12 pb-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16"
	>
		<div class="min-w-0">
			{#if form?.success}
				<div class={classNames(classes.surface, 'grid gap-2 p-6')}>
					<p class="text-h3 text-ink font-serif font-semibold">Thanks for reaching out</p>
					<p class="text-ink-muted font-serif text-[1.0625rem]">
						I&apos;ve received your message and will get back to you soon.
					</p>
				</div>
			{:else if !env.PUBLIC_TURNSTILE_SITE_KEY}
				<div class={classNames(classes.surface, 'grid gap-2 p-6')}>
					<p class="text-h3 text-ink font-serif font-semibold">Contact form unavailable</p>
					<p class="text-ink-muted font-serif text-[1.0625rem]">
						The contact form is currently unavailable. Please use one of the links to the side to
						get in touch.
					</p>
				</div>
			{:else}
				<form
					method="POST"
					use:enhance
					class={classNames(classes.surface, 'grid min-w-0 gap-5 p-4 sm:p-6 lg:p-8')}
				>
					{#if form?.error}
						<!--
							The error is announced rather than only coloured, and it carries an
							icon-free text label, so it does not depend on colour alone.
						-->
						<p
							role="alert"
							class="border-accent-bright bg-accent-soft text-ui text-ink rounded-lg border px-4 py-3 font-sans"
						>
							{form.error}
						</p>
					{/if}

					<div class="grid gap-1.5">
						<label for="name" class={classes.label}>Name</label>
						<input type="text" id="name" name="name" required class={classes.input} />
					</div>

					<div class="grid gap-1.5">
						<label for="email" class={classes.label}>Email</label>
						<input type="email" id="email" name="email" required class={classes.input} />
					</div>

					<div class="grid gap-1.5">
						<label for="message" class={classes.label}>Message</label>
						<textarea
							id="message"
							name="message"
							rows="6"
							required
							class={classNames(classes.input, 'resize-y')}></textarea>
					</div>

					{#if env.PUBLIC_TURNSTILE_SITE_KEY}
						<div class="max-w-full min-w-0 overflow-x-auto">
							<Turnstile siteKey={env.PUBLIC_TURNSTILE_SITE_KEY} />
						</div>
					{/if}

					<div class="border-rule border-t pt-5">
						<button type="submit" class={classes.button}>Send message</button>
					</div>
				</form>
			{/if}
		</div>

		<div class="grid content-start gap-5">
			<h2 class={classes.eyebrow}>Elsewhere</h2>
			<ul class="border-rule grid border-t">
				{#each socials as social (social.label)}
					{@const Icon = social.icon}
					<li class="border-rule border-b">
						<a
							href={social.href}
							class="group flex items-center gap-3 py-4 no-underline transition-colors duration-150 ease-out"
						>
							<span class="text-ink-faint group-hover:text-accent transition-colors">
								<Icon />
							</span>
							<span class="grid">
								<span
									class="text-ui text-ink group-hover:text-accent font-sans font-medium transition-colors"
									>{social.label}</span
								>
								<span class={classes.label}>{social.handle}</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
