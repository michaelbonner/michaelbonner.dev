<script>
	import gitBranchNameGenerator1 from '$lib/images/git-branch-name-generator-1.webp?enhanced';
	import gitBranchNameGenerator2 from '$lib/images/git-branch-name-generator-2.webp?enhanced';
	import gitBranchNameGenerator3 from '$lib/images/git-branch-name-generator-3.webp?enhanced';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
</script>

<Seo
	description="Check out the new Git Branch Name Raycast Extension I made"
	ogImage={gitBranchNameGenerator3}
	ogType="article"
	title="Git Branch Name Raycast Extension | Michael Bonner"
/>

<svelte:head>
	<meta property="article:published_time" content="2023-01-17T12:58:46.469Z" />
	<meta name="publish_date" property="og:publish_date" content="2023-01-17T12:58:46.469Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/git-branch-name-raycast-extension" />
</svelte:head>

<main class="container mx-auto px-8 py-12 flex items-center">
	<div class="w-full max-w-3xl prose dark:prose-invert">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="text-4xl tracking-wider leading-[1.3em] lg:pr-8">
						Check out the new Git Branch Name Raycast Extension I made
					</h1>
				</div>
			</div>
			<div class="lg:mt-24 text-lg max-w-5xl prose-img:my-0 prose-figcaption:text-center">
				<h2>What is Raycast?</h2>
				<p>
					Raycast is a super fast, totally extendable launcher. It lets you complete tasks,
					calculate, share common links, manage your clipboard history, and much more. If you don't
					have it installed, I recommend you go give it a try.
				</p>
				<div class="flex flex-wrap gap-8">
					<p>
						<A href="https://youtu.be/JKbTyXQ_QWA">Raycast overview on YouTube</A>
					</p>
					<p>
						<A href="https://raycast.com">Download Raycast</A>
					</p>
				</div>
				<h2>What is the Git Branch Name Raycast Extension?</h2>
				<p>
					The Git Branch Name Raycast Extension is a simple extension that allows you to generate a
					branch name based on the type of branch you are working on and a string. I usually copy
					the name of the to-do and paste that in. It also allows you to copy the branch name to
					your clipboard.
				</p>

				<p>
					<a href="https://www.raycast.com/mbonner/git-branch-name-generator"
						><img
							alt="Raycast Extension Install Button"
							loading="lazy"
							src="https://www.raycast.com/mbonner/git-branch-name-generator/install_button@2x.png"
							style="height: 64px;"
						/></a
					>
				</p>

				<figure>
					<enhanced:img
						alt="Choosing a branch type"
						class="w-full"
						src={gitBranchNameGenerator1}
						loading="lazy"
					/>
					<figcaption>Choose your branch type</figcaption>
				</figure>

				<figure>
					<enhanced:img
						alt="Add you branch name"
						class="w-full m-0"
						loading="lazy"
						src={gitBranchNameGenerator2}
					/>
					<figcaption>Enter your branch name</figcaption>
				</figure>

				<figure>
					<enhanced:img
						alt="Results get copied to your clipboard"
						class="w-full"
						loading="lazy"
						src={gitBranchNameGenerator3}
					/>
					<figcaption>Results get copied to your clipboard</figcaption>
				</figure>

				<p>
					<a href="https://www.raycast.com/mbonner/git-branch-name-generator"
						><img
							alt="Raycast Extension Install Button"
							loading="lazy"
							src="https://www.raycast.com/mbonner/git-branch-name-generator/install_button@2x.png"
							style="height: 64px;"
						/></a
					>
				</p>

				<p class="mt-16">
					Published:{` `}
					<time dateTime="2023-01-17">17 Jan 2023</time>
				</p>
			</div>
		</div>
	</div>
</main>
