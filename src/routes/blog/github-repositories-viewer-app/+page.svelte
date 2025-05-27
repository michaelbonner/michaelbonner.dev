<script>
	import githubRepositoriesViewer from '$lib/images/github-repositories-viewer.jpg?enhanced&w=768,440';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
</script>

<Seo
	description="I made a little app to help me keep track of who has access to what GitHub repository"
	ogImage={githubRepositoriesViewer}
	ogType="article"
	title="GitHub Repository Collaborators Viewer | Michael Bonner"
/>

<svelte:head>
	<meta property="article:published_time" content="2022-09-14T22:58:46.469Z" />
	<meta name="publish_date" property="og:publish_date" content="2022-09-14T22:58:46.469Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/github-repositories-viewer-app" />
</svelte:head>

<div class="container mx-auto flex items-center px-8 py-12">
	<div class="prose dark:prose-invert w-full max-w-3xl">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="text-4xl leading-[1.3em] tracking-wider lg:pr-8">
						I made a little app to help me keep track of who has access to what GitHub repository
					</h1>
				</div>
			</div>
			<div class="prose-img:my-0 prose-figcaption:text-center max-w-5xl text-lg lg:mt-24">
				<h2>Do you have a bunch of repos and no easy way to know who's on them?</h2>
				<p>
					If you're like me, this is a problem. GitHub doesn't make it easy to see who has access to
					what repository. I have a lot of repositories and I need to know who has access to what. I
					made a little app to help me. Anyone can use it, just add your own access token from
					GitHub and you can see all your repos and who is on them. This information never leaves
					your computer, so you don't need to worry about me peeping.
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

				<p class="mt-16">
					Published:&nbsp;
					<time dateTime="2023-01-17">14 Sep 2023</time>
				</p>
			</div>
		</div>
	</div>
</div>
