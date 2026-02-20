<script lang="ts">
	import { Turnstile } from 'svelte-turnstile';
	import { env } from '$env/dynamic/public';
	import { enhance } from '$app/forms';
	import Github from '../../icons/Github.svelte';
	import Instagram from '../../icons/Instagram.svelte';
	import LinkedIn from '../../icons/LinkedIn.svelte';
	import Seo from '../../components/Seo.svelte';
	import clsx from 'clsx';

	let { form } = $props();
</script>

<Seo
	title="Contact | Michael Bonner"
	description="Get in touch with Michael Bonner, a full-stack developer in Salt Lake City, Utah."
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/contact" />
</svelte:head>

<div class="container mx-auto my-20 px-8 sm:my-36">
	<h1 class="mb-12 text-4xl font-semibold">Get In Touch</h1>

	<div class="grid gap-16 md:grid-cols-2">
		<!-- Contact Form -->
		<div>
			<h2 class="mb-6 text-2xl font-semibold">Send a Message</h2>

			{#if form?.success}
				<div
					class="mb-6 rounded-lg border border-green-200 bg-green-100 p-6 text-green-900 dark:border-green-800 dark:bg-green-900/40 dark:text-green-100"
				>
					<p class="text-lg font-medium">Thanks for reaching out!</p>
					<p class="mt-2 text-green-800 dark:text-green-200">
						I've received your message and will get back to you soon.
					</p>
				</div>
			{:else}
				<form method="POST" use:enhance class="grid gap-6">
					{#if form?.error}
						<div
							class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-200"
						>
							{form.error}
						</div>
					{/if}

					<div>
						<label for="name" class="mb-2 block text-lg font-medium">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							class="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 text-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900/50"
						/>
					</div>

					<div>
						<label for="email" class="mb-2 block text-lg font-medium">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							class="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 text-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900/50"
						/>
					</div>

					<div>
						<label for="message" class="mb-2 block text-lg font-medium">Message</label>
						<textarea
							id="message"
							name="message"
							rows="5"
							required
							class="w-full rounded-lg border border-gray-300 bg-white/50 px-4 py-3 text-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900/50"
						></textarea>
					</div>

					{#if env.PUBLIC_TURNSTILE_SITE_KEY}
						<Turnstile siteKey={env.PUBLIC_TURNSTILE_SITE_KEY} />
					{/if}

					<button
						type="submit"
						class={clsx(
							'w-fit cursor-pointer rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors',
							'hover:scale-105 hover:rotate-1 hover:bg-blue-700'
						)}
					>
						Send Message
					</button>
				</form>
			{/if}
		</div>

		<!-- Social Links -->
		<div>
			<h2 class="mb-6 text-2xl font-semibold">Connect</h2>
			<p class="mb-8 text-lg leading-relaxed">
				You can also find me on these platforms. Feel free to connect or send a message there!
			</p>

			<ul class="grid gap-4">
				<li>
					<a
						href="https://www.linkedin.com/in/michaelbonner/"
						class={clsx(
							'flex items-center gap-4 rounded-lg border border-gray-300 p-4 transition',
							'dark:border-gray-700 dark:hover:bg-white/10',
							'hover:scale-105 hover:rotate-1 hover:bg-blue-700 hover:bg-white/50'
						)}
					>
						<span class="text-blue-700 dark:text-blue-400"><LinkedIn /></span>
						<span class="text-xl font-medium">LinkedIn</span>
					</a>
				</li>
				<li>
					<a
						href="https://github.com/michaelbonner"
						class={clsx(
							'flex items-center gap-4 rounded-lg border border-gray-300 p-4 transition',
							'dark:border-gray-700 dark:hover:bg-white/10',
							'hover:scale-105 hover:rotate-1 hover:bg-blue-700 hover:bg-white/50'
						)}
					>
						<span class="text-gray-900 dark:text-white"><Github /></span>
						<span class="text-xl font-medium">GitHub</span>
					</a>
				</li>
				<li>
					<a
						href="https://www.instagram.com/michael__bonner"
						class={clsx(
							'flex items-center gap-4 rounded-lg border border-gray-300 p-4 transition',
							'dark:border-gray-700 dark:hover:bg-white/10',
							'hover:scale-105 hover:rotate-1 hover:bg-blue-700 hover:bg-white/50'
						)}
					>
						<span class="text-pink-600 dark:text-pink-400"><Instagram /></span>
						<span class="text-xl font-medium">Instagram</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>
