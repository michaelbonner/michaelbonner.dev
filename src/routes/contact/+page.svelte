<script lang="ts">
	import { Turnstile } from 'svelte-turnstile';
	import { env } from '$env/dynamic/public';
	import { enhance } from '$app/forms';
	import Github from '../../icons/Github.svelte';
	import Instagram from '../../icons/Instagram.svelte';
	import LinkedIn from '../../icons/LinkedIn.svelte';
	import Seo from '../../components/Seo.svelte';

	let { form } = $props();
</script>

<Seo
	title="Contact | Michael Bonner"
	description="Get in touch with Michael Bonner, a full-stack developer in Salt Lake City, Utah."
	ogImage="/og/contact.jpg"
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/contact" />
</svelte:head>

<section class="py-16 sm:py-20 lg:py-28">
	<div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
		<p class="text-tomato font-sans text-base font-medium sm:text-sm">Say hello</p>
		<h1
			class="mt-3 max-w-[13ch] text-6xl font-medium tracking-tight text-balance sm:text-7xl lg:text-8xl"
		>
			Get in touch
		</h1>

		<div class="border-ink/20 mt-14 grid gap-16 border-t pt-10 md:grid-cols-2 lg:gap-24">
			<!-- Contact Form -->
			<div>
				<h2 class="mb-6 text-4xl font-medium tracking-tight text-balance">Send a message</h2>

				{#if form?.success}
					<div class="bg-butter border-ink/20 mb-6 border p-6 font-sans">
						<p class="text-lg font-medium">Thanks for reaching out!</p>
						<p class="text-ink-muted mt-2">
							I've received your message and will get back to you soon.
						</p>
					</div>
				{:else if !env.PUBLIC_TURNSTILE_SITE_KEY}
					<div class="bg-butter border-ink/20 mb-6 border p-6 font-sans">
						<p class="text-lg font-medium">Contact Form Unavailable</p>
						<p class="text-ink-muted mt-2">
							The contact form is currently unavailable. Please use one of the social links below to
							get in touch.
						</p>
					</div>
				{:else}
					<form method="POST" use:enhance class="grid gap-6 font-sans">
						{#if form?.error}
							<div class="border-tomato bg-tomato/10 text-ink border p-4">
								{form.error}
							</div>
						{/if}

						<div>
							<label for="name" class="mb-2 block text-lg font-medium sm:text-base">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								class="bg-cream border-ink/25 focus:border-tomato focus:ring-tomato/20 w-full border px-4 py-3 text-lg outline-none focus:ring-4 sm:text-base"
							/>
						</div>

						<div>
							<label for="email" class="mb-2 block text-lg font-medium sm:text-base">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								class="bg-cream border-ink/25 focus:border-tomato focus:ring-tomato/20 w-full border px-4 py-3 text-lg outline-none focus:ring-4 sm:text-base"
							/>
						</div>

						<div>
							<label for="message" class="mb-2 block text-lg font-medium sm:text-base"
								>Message</label
							>
							<textarea
								id="message"
								name="message"
								rows="5"
								required
								class="bg-cream border-ink/25 focus:border-tomato focus:ring-tomato/20 w-full border px-4 py-3 text-lg outline-none focus:ring-4 sm:text-base"
							></textarea>
						</div>

						{#if env.PUBLIC_TURNSTILE_SITE_KEY}
							<Turnstile siteKey={env.PUBLIC_TURNSTILE_SITE_KEY} />
						{/if}

						<button
							type="submit"
							class="bg-tomato text-cream focus-visible:outline-tomato min-h-12 w-fit cursor-pointer px-6 py-3 text-lg font-semibold outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-transform sm:text-base"
						>
							Send Message
						</button>
					</form>
				{/if}
			</div>

			<!-- Social Links -->
			<div>
				<h2 class="mb-6 text-4xl font-medium tracking-tight text-balance">Connect elsewhere</h2>
				<p class="text-ink-muted mb-8 max-w-[48ch] font-sans text-lg text-pretty sm:text-base/7">
					You can also find me on these platforms. Feel free to connect or send a message there.
				</p>

				<ul class="border-ink/20 divide-ink/15 grid divide-y border-y font-sans" role="list">
					<li>
						<a
							href="https://www.linkedin.com/in/michaelbonner/"
							class="hover:text-tomato focus-visible:text-tomato flex min-h-16 items-center gap-4 py-4 outline-none"
						>
							<LinkedIn className="size-5 shrink-0" />
							<p class="text-xl font-medium">LinkedIn</p>
						</a>
					</li>
					<li>
						<a
							href="https://github.com/michaelbonner"
							class="hover:text-tomato focus-visible:text-tomato flex min-h-16 items-center gap-4 py-4 outline-none"
						>
							<Github className="size-5 shrink-0" />
							<p class="text-xl font-medium">GitHub</p>
						</a>
					</li>
					<li>
						<a
							href="https://www.instagram.com/michael__bonner"
							class="hover:text-tomato focus-visible:text-tomato flex min-h-16 items-center gap-4 py-4 outline-none"
						>
							<Instagram className="size-5 shrink-0" />
							<p class="text-xl font-medium">Instagram</p>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
