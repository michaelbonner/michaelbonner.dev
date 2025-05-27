<script>
	import pagespeed from '$lib/images/projects/pagespeed.jpg?enhanced&w=470';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
</script>

<Seo
	description="I made a little tool to test the performance of pages on a site on one page"
	ogImage={pagespeed}
	ogType="article"
	title="PageSpeed Testing | Michael Bonner"
/>

<svelte:head>
	<meta property="article:published_time" content="2025-04-09T16:00:00.000Z" />
	<meta name="publish_date" property="og:publish_date" content="2025-04-09T16:00:00.000Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/pagespeed-testing" />
</svelte:head>

<div class="container mx-auto flex items-center px-8 py-12">
	<div class="prose dark:prose-invert w-full max-w-3xl">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="text-4xl leading-[1.3em] tracking-wider lg:pr-8">
						PageSpeed Testing is important, you should take it seriously
					</h1>
				</div>
			</div>
			<div class="prose-img:my-0 prose-figcaption:text-center max-w-5xl text-lg lg:mt-24">
				<p>
					PageSpeed Insights is a tool that helps you test the performance of your site. It measures
					how quickly the content loads and how quickly a person would be able to use the site.
					<A
						className="inline"
						href="https://developers.google.com/search/blog/2018/01/using-page-speed-in-mobile-search"
						>Google has said</A
					> that they use this data to rank sites in search, so I think it's important to keep an eye
					on it. There are other tools out there to do something similar, but they all feel too complicated
					and overwhelming. This tools sticks to the bare minimum of what I need to know with links to
					more detailed information when I need it.
				</p>

				<p>Here's a screenshot of the tool:</p>

				<figure>
					<a href="https://pagespeed.bootpack.dev/" aria-label="PageSpeed testing website"
						><enhanced:img alt="PageSpeed Testing" src={pagespeed} /></a
					>
				</figure>

				<p>
					You can find the tool here: <A className="inline" href="https://pagespeed.bootpack.dev/"
						>pagespeed.bootpack.dev</A
					>.
				</p>

				<p>
					You can find the source code here: <A
						className="inline"
						href="https://github.com/michaelbonner/pagespeed">github.com/michaelbonner/pagespeed</A
					>. Feel free to fork it and make it your own. You'll need an api key from Google to use it
					in your own project.
				</p>

				<p class="mt-16">
					Published:&nbsp;
					<time dateTime="2023-01-17">17 Jan 2023</time>
				</p>
			</div>
		</div>
	</div>
</div>
