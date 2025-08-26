<script>
	import afterExtension from '$lib/images/after-extension.png?enhanced&w=768,440';
	import availableInTheChromeWebStore from '$lib/images/available-in-the-chrome-web-store.png?enhanced&w=768,440';
	import beforeExtension from '$lib/images/before-extension.png?enhanced&w=768,440';
	import chromeBasecampExtension from '$lib/images/chrome-basecamp-ui-extension.jpg?enhanced';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
</script>

<Seo
	description="Really simple one, and it was really easy to make"
	ogImage={chromeBasecampExtension.img.src}
	ogType="article"
	title="I made my first Chrome extension | Michael Bonner"
/>

<svelte:head>
	<meta property="article:published_time" content="2022-05-01T12:58:46.469Z" />
	<meta name="publish_date" property="og:publish_date" content="2022-05-01T12:58:46.469Z" />
	<meta name="author" content="Michael Bonner" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/i-made-an-extension" />
</svelte:head>

<div class="container mx-auto flex items-center px-8 py-12">
	<div class="prose dark:prose-invert w-full max-w-3xl">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="text-4xl leading-[1.3em] tracking-wider lg:pr-8">
						I made my first Chrome extension
					</h1>
				</div>
			</div>
			<div class="max-w-5xl text-lg lg:mt-24">
				<p>
					I didn&apos;t realize how easy it is to make an extension. Google has a step-by-step
					example here:
					<A
						className="break-all"
						href="https://developer.chrome.com/docs/extensions/mv3/getstarted/"
					>
						https://developer.chrome.com/docs/extensions/mv3/getstarted/
					</A>
				</p>

				<p>
					I use Basecamp, and I love it. But I wanted to change some of the UI a bit. I figure other
					people might like the changes too.
				</p>

				<h2>Before extension</h2>
				<figure>
					<enhanced:img
						alt="Before extension"
						sizes="(max-width: 768px) 100vw, 768px"
						src={beforeExtension}
					/>
					<figcaption class="text-center">
						Notice how big and in your face those completed items are?
					</figcaption>
				</figure>
				<h2>After extension</h2>
				<figure>
					<enhanced:img
						alt="After extension"
						loading="lazy"
						sizes="(max-width: 768px) 100vw, 768px"
						src={afterExtension}
					/>
					<figcaption class="text-center">Notice how much nicer that looks?</figcaption>
				</figure>

				<p>
					That&apos;s all it does for now, but I&apos;ll add more as I find other things that bug
					me. 😄
				</p>

				<p>
					<a
						href="https://chrome.google.com/webstore/detail/basecamp-ui-tweaks/aefhfcjkdpdjhbjdhoojknelmlodaidn?hl=en"
					>
						Download the extension here
					</a>
				</p>

				<p>
					<a
						href="https://chrome.google.com/webstore/detail/basecamp-ui-tweaks/aefhfcjkdpdjhbjdhoojknelmlodaidn?hl=en"
						aria-label="Available in the chrome web store"
					>
						<enhanced:img
							alt="Available in the chrome web store"
							class="max-w-[200px] rounded-md bg-white shadow-xs"
							loading="lazy"
							sizes="(max-width: 768px) 100vw, 768px"
							src={availableInTheChromeWebStore}
						/>
					</a>
				</p>

				<p class="mt-16">
					Published:
					<time dateTime="2022-05-01">01 May 2022</time>
				</p>
			</div>
		</div>
	</div>
</div>
