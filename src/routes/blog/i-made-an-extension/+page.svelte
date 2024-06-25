<script>
	import afterExtension from '$lib/images/after-extension.webp?enhanced';
	import availableInTheChromeWebStore from '$lib/images/available-in-the-chrome-web-store.webp?enhanced';
	import beforeExtension from '$lib/images/before-extension.webp?enhanced';
	import ogImage from '$lib/images/chrome-basecamp-ui-extension.webp?enhanced';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
</script>

<Seo
	description="Really simple one, and it was really easy to make"
	{ogImage}
	ogType="article"
	title="I made my first Chrome extension | Michael Bonner"
/>

<svelte:head>
	<meta property="article:published_time" content="2022-05-01T12:58:46.469Z" />
	<meta name="publish_date" property="og:publish_date" content="2022-05-01T12:58:46.469Z" />
	<meta name="author" content="Michael Bonner" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/i-made-an-extension" />
</svelte:head>

<main class="container mx-auto px-8 py-12 flex items-center">
	<div class="w-full max-w-3xl prose dark:prose-invert">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="text-4xl tracking-wider leading-[1.3em] lg:pr-8">
						I made my first Chrome extension
					</h1>
				</div>
			</div>
			<div class="lg:mt-24 text-lg max-w-5xl">
				<p>
					I didn&apos;t realize how easy it is to make an extension. Google has a step-by-step
					example here:{' '}
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
					<enhanced:img alt="Before extension" src={beforeExtension} />
					<figcaption class="text-center">
						Notice how big and in your face those completed items are?
					</figcaption>
				</figure>
				<h2>After extension</h2>
				<figure>
					<enhanced:img alt="After extension" src={afterExtension} />
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
					>
						<enhanced:img
							class="bg-white rounded-md shadow-sm max-w-[200px]"
							alt="Available in the chrome web store"
							src={availableInTheChromeWebStore}
						/>
					</a>
				</p>

				<p class="mt-16">
					Published:{` `}
					<time dateTime="2022-05-01">01 May 2022</time>
				</p>
			</div>
		</div>
	</div>
</main>
