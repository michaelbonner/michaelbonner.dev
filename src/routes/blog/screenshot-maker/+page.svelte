<script>
	import screenshotMaker from '$lib/images/projects/screenshot-maker.webp?enhanced';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
	import BlogPostSchema from '../../../components/BlogPostSchema.svelte';
</script>

<Seo
	description="A tool to make screenshots of websites. Dang simple and serverless ready"
	ogImage="/og/blog-screenshot-maker.jpg"
	ogType="article"
	title="Screenshot Maker | Michael Bonner"
/>

<BlogPostSchema
	title="Screenshot Maker"
	description="A tool to make screenshots of websites. Dang simple and serverless ready"
	url="https://michaelbonner.dev/blog/screenshot-maker"
	datePublished="2025-05-14T16:46:00.845Z"
	dateModified="2025-12-03T10:21:51.000Z"
	image={screenshotMaker.img.src}
/>

<svelte:head>
	<meta property="article:published_time" content="2025-05-14T16:46:00.845Z" />
	<meta name="publish_date" property="og:publish_date" content="2025-05-14T16:46:00.845Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/screenshot-maker" />
</svelte:head>

<div class="container mx-auto px-6 py-12 sm:px-8 lg:py-20">
	<div class="prose w-full max-w-[68ch]">
		<h1>Screenshot Maker</h1>
		<div class="prose-img:my-0 prose-figcaption:text-center mt-8">
			<p>
				I like to take screenshots of websites for a handful of reasons. It's helpful sometimes when
				you're making dependency updates to have an easy visual of the before-and-after. I also add
				screenshots of projects to the <A className="inline" href="https://redirectswizard.com/"
					>Redirects Wizard</A
				> project when viewing the index of redirect batches. I also take screenshots of projects for
				marketing and posting on websites. It's not the easiest thing to get a consistent screenshot of
				a project, so I made a tool to do it.
			</p>

			<p>
				Enter the desired inputs to generate a screenshot URL. The images are cached for an hour, so
				you can use it as many times as you want. Hopefully it's pretty easy to use, but let me know
				if you run into issues.
			</p>

			<p>Here's a screenshot of the tool:</p>

			<figure>
				<a href="https://screenshot-maker.bootpack.dev/" aria-label="PageSpeed testing website"
					><enhanced:img alt="PageSpeed Testing" src={screenshotMaker} /></a
				>
			</figure>

			<p>
				You can find the tool here: <A
					className="inline"
					href="https://screenshot-maker.bootpack.dev/">screenshot-maker.bootpack.dev</A
				>.
			</p>

			<p>
				You can find the source code here: <A
					className="inline"
					href="https://github.com/michaelbonner/screenshot-maker"
					>github.com/michaelbonner/screenshot-maker</A
				>. Feel free to fork it and make it your own.
			</p>

			<p
				class="not-prose border-rule text-ui-sm text-ink-faint mt-16 flex flex-wrap gap-x-2 border-t pt-6 font-sans tracking-wide"
			>
				Published:
				<time dateTime="2025-05-14">14 May 2025</time>
			</p>
		</div>
	</div>
</div>
