<script>
	import screenshotMaker from '$lib/images/projects/screenshot-maker.webp?enhanced';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
</script>

<Seo
	description="A tool to make screenshots of websites. Dang simple and serverless ready"
	ogImage={screenshotMaker.img.src}
	ogType="article"
	title="Screenshot Maker | Michael Bonner"
/>

<svelte:head>
	<meta property="article:published_time" content="2025-05-14T16:46:00.845Z" />
	<meta name="publish_date" property="og:publish_date" content="2025-05-14T16:46:00.845Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/screenshot-maker" />
</svelte:head>

<div class="container mx-auto flex items-center px-8 py-12">
	<div class="prose dark:prose-invert w-full max-w-3xl">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="text-4xl leading-[1.3em] tracking-wider lg:pr-8">Screenshot Maker</h1>
				</div>
			</div>
			<div class="prose-img:my-0 prose-figcaption:text-center max-w-5xl text-lg lg:mt-24">
				<p>
					I like to take screenshots of websites for a handful of reasons. It's helpful sometimes
					when you're making dependency updates to have an easy visual of the before and after. I
					also add screenshots of projects to the <A
						className="inline"
						href="https://redirects.bootpack.dev/">Redirects Wizard</A
					> project when viewing the index of redirect batches. I also take screenshots of projects for
					marketing and posting on websites. It's not the easiest thing to get a consistent screenshot
					of a project, so I made a tool to do it.
				</p>

				<p>
					You add the desired inputs which will generate a url to a screenshot. The images are
					cached for an hour, so you can use it as many times as you want. Hopefully it's pretty
					easy to use but let me know if you run into issues.
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

				<p class="mt-16">
					Published:
					<time dateTime="2025-05-14">14 May 2025</time>
				</p>
			</div>
		</div>
	</div>
</div>
