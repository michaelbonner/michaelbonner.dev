<script>
	import githubRepositoriesViewer from '$lib/images/github-repositories-viewer.jpg?enhanced';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
	import BlogPostSchema from '../../../components/BlogPostSchema.svelte';
</script>

<Seo
	description="I made a little app to help me keep track of who has access to what GitHub repository"
	ogImage="/og/blog-github-repositories-viewer-app.jpg"
	ogType="article"
	title="GitHub Repository Collaborators Viewer | Michael Bonner"
/>

<BlogPostSchema
	title="GitHub Repository Collaborators Viewer"
	description="I made a little app to help me keep track of who has access to what GitHub repository"
	url="https://michaelbonner.dev/blog/github-repositories-viewer-app"
	datePublished="2023-09-14T22:58:46.469Z"
	dateModified="2025-12-03T10:21:51.000Z"
	image={githubRepositoriesViewer.img.src}
/>

<svelte:head>
	<meta property="article:published_time" content="2023-09-14T22:58:46.469Z" />
	<meta name="publish_date" property="og:publish_date" content="2023-09-14T22:58:46.469Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/github-repositories-viewer-app" />
</svelte:head>

<div class="container mx-auto px-6 py-12 sm:px-8 lg:py-20">
	<div class="prose w-full max-w-[68ch]">
		<h1>GitHub Repository Collaborators Viewer</h1>
		<div class="prose-img:my-0 prose-figcaption:text-center mt-8">
			<h2>Do you have a bunch of repos and no easy way to know who's on them?</h2>
			<p>
				If you're like me, this is a problem. GitHub doesn't make it easy to see who has access to
				what repository. I have a lot of repositories and I need to know who has access to what. I
				made a little app to help me. Anyone can use it, just add your own access token from GitHub
				and you can see all your repos and who is on them. This information never leaves your
				computer, so you don't need to worry about me peeping.
			</p>
			<div class="flex flex-wrap gap-8">
				<p>
					<A href="https://github-repositories-viewer.bootpack.dev/"
						>https://github-repositories-viewer.bootpack.dev/</A
					>
				</p>
			</div>

			<figure>
				<enhanced:img
					alt="Screenshot of the GitHub Repositories Viewer app"
					class="m-0 w-full"
					loading="lazy"
					sizes="(max-width: 768px) 100vw, 440px"
					src={githubRepositoriesViewer}
				/>
				<figcaption>
					Get your token from GitHub, then see all your repos and who is on them
				</figcaption>
			</figure>

			<p
				class="not-prose border-rule text-ui-sm text-ink-faint mt-16 flex flex-wrap gap-x-2 border-t pt-6 font-sans tracking-wide"
			>
				Published:
				<time dateTime="2023-01-17">14 Sep 2023</time>
			</p>
		</div>
	</div>
</div>
