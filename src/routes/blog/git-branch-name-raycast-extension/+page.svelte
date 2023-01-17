<script>
	import Image from 'svimg';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
</script>

<Seo
	description="Check out the new Git Branch Name Raycast Extension I made"
	ogImage="https://michaelbonner.dev/images/git-branch-name-generator-3.jpg"
	ogType="article"
	title="Git Branch Name Raycast Extension | Michael Bonner"
/>

<svelte:head>
	<meta property="article:published_time" content="2022-05-01T12:58:46.469Z" />
	<meta name="publish_date" property="og:publish_date" content="2022-05-01T12:58:46.469Z" />
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
					Raycast is a new way to control your Mac. It&apos;s a productivity tool that helps you to
					be more efficient with your daily tasks. It&apos;s a Spotlight on steroids. If you don't
					have it installed, I recommend you go give it a try.
				</p>
				<p>
					<A href="https://raycast.com">Download Raycast</A>
				</p>
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
							src="https://www.raycast.com/mbonner/git-branch-name-generator/install_button@2x.png"
							height="64"
							alt=""
							style="height: 64px;"
						/></a
					>
				</p>

				<figure>
					<Image
						class="w-full"
						src="/images/git-branch-name-generator-1.jpg"
						alt="Choosing a branch type"
						immediate={true}
					/>
					<figcaption>Choose your branch type</figcaption>
				</figure>

				<figure>
					<Image
						class="w-full m-0"
						src="/images/git-branch-name-generator-2.jpg"
						alt="Add you branch name"
						immediate={true}
					/>
					<figcaption>Enter your branch name</figcaption>
				</figure>

				<figure>
					<Image
						class="w-full"
						src="/images/git-branch-name-generator-3.jpg"
						alt="Results get copied to your clipboard"
						immediate={true}
					/>
					<figcaption>Results get copied to your clipboard</figcaption>
				</figure>

				<p>
					<a href="https://www.raycast.com/mbonner/git-branch-name-generator"
						><img
							src="https://www.raycast.com/mbonner/git-branch-name-generator/install_button@2x.png"
							height="64"
							alt=""
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
