<script lang="ts">
	import H2 from '../components/H2.svelte';
	import Seo from '../components/Seo.svelte';
	import { classNames } from '../functions/classNames';
	import Github from '../icons/Github.svelte';
	import Instagram from '../icons/Instagram.svelte';
	import Link from '../icons/Link.svelte';
	import LinkedIn from '../icons/LinkedIn.svelte';
	import mainImage from '../lib/images/on-the-beach-600.jpg?enhanced';
	import { classes } from '../styles/classes';

	const projects = [
		{
			title: `Primary Children's Hospital: Here Kids Win`,
			description: `Primary Children's Hospital wanted a website to promote patient stories. Faktory reached out to me to build the site they had envisioned. I'm really happy with how this one came out. Next.js made so much of it really simple.`,
			url: `https://herekidswin.com/`,
			github: `https://github.com/FaktoryUtah/primary-childrens-stories`
		},
		{
			title: `Wasatch Covers`,
			description: `An eCommerce site built using Gatsby.js. Load times went from over 10 seconds on their old platform, down to near instantaneous on the new one.`,
			url: `https://wasatchcovers.com/`
		},
		{
			title: `JME Film Co`,
			description: `Built using Sanity CMS and Next.js. This one turned out really good and loads so fast.`,
			url: `https://www.jmillsent.com/`,
			github: `https://github.com/michaelbonner/jmillsent`
		},
		{
			title: `CrewView`,
			description: `I'm part of a team building a web application that helps companies manage their projects, people, and assets in a way that's easy to use and intuitive.`,
			url: `https://crewview.com/`
		},
		{
			title: `NEF Programs Administration System`,
			description: `Big ol' platform to administer all of their programs. Can't show you the code for security reasons, but I'm really proud of it so I wanted to at least put it here. 😆`,
			url: `https://pas.nef1.org/`
		}
	];
	const otherThings = [
		{
			title: `Lazy Uncle`,
			description: `I have a lot of people in my family, and sometimes it's hard to keep track of their birthdays and how old they are. Lazy Uncle makes it a little easier. Give it a shot and let me know what you think.`,
			url: `https://www.lazyuncle.net/`,
			github: `https://github.com/michaelbonner/lazy-uncle`
		},
		{
			title: `Podcasts I Listen To`,
			description: `I am really into podcasts, and people ask what podcasts they should listen to. I built this site to make it easier to share the really good ones.`,
			url: `https://podcasts.michaelbonner.dev/`,
			github: `https://github.com/michaelbonner/podcasts-i-listen-to`
		},
		{
			title: `Route Picker`,
			description: `Sometimes you just wanna have a timer to time a couple different routes and see which one is faster over time. This is made to do just that.`,
			url: `https://www.whichrouteisfaster.com/`,
			github: `https://github.com/michaelbonner/route-picker`
		},
		{
			title: `GitHub Repository Collaborators Viewer`,
			description: `GitHub (on purpose) doesn't make it very easy for individuals to see a list of all your repos and who has access to them. This little app helps you see that.`,
			url: `https://github-repositories-viewer.bootpack.dev/`,
			github: `https://github.com/michaelbonner/github-repositories-viewer`
		},
		{
			title: `NHL Arenas To Visit`,
			description: `The plan is to visit every home ice arena. Seems like a decent way to explore the US and Canada`,
			url: `https://nhl.michaelbonner.dev/`,
			github: `https://github.com/michaelbonner/nhl-arenas-react`
		},
		{
			title: `Days Until`,
			description: `You ever wanted a site to just tell you how many days until a specific date. Well here you go. Really I just needed something easy to start building Svelte projects.`,
			url: `https://days-until.michaelbonner.dev/`,
			github: `https://github.com/michaelbonner/days-until`
		},
		{
			title: `date-fns Format Helper`,
			description: `I always forget date-fns format strings. This site offers some sane defaults and makes it easy to see what the format string will look like.`,
			url: `https://date-fns.michaelbonner.dev/`,
			github: `https://github.com/michaelbonner/date-fns-format`
		},
		{
			title: `Cookie Parser`,
			description: `Now you don't have to wonder what all the cookies on a site mean. Just copy and paste the cookies string and the site will tell you what cookies are present with links to learn more.`,
			url: `https://cookie-parser.michaelbonner.dev/`,
			github: `https://github.com/michaelbonner/cookie-parser`
		},
		{
			title: `OCR Reader`,
			description: `Just a little example of how Tesseract can be used to read text from an uploaded image.`,
			url: `https://ocr.michaelbonner.dev/`,
			github: `https://github.com/michaelbonner/tesseract-test`
		},
		{
			title: `Random String Generator`,
			description: `I got tired of Googling for a site and getting a bunch of cruft I don't need when trying to generate a random string, so I built a dead simple replacement.`,
			url: `https://random-string-generator.michaelbonner.dev/`,
			github: `https://github.com/michaelbonner/random-string-generator`
		}
	];

	const tools = [
		'JavaScript',
		'TypeScript',
		'React',
		'Svelte',
		'Node',
		'PHP',
		'AWS',
		'Serverless',
		'Next.js',
		'Gatsby',
		'GraphQL',
		'Prisma',
		'Apollo',
		'Laravel',
		'MongoDB',
		'MySQL',
		'PostgreSQL',
		'WordPress',
		'Shopify'
	];
</script>

<Seo
	title="Michael Bonner | Developer in Salt Lake, UT"
	description="Hi, I'm Michael Bonner. I'm a web developer in Salt Lake UT that specializes in business efficiency applications, APIs, and integrations."
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/" />
</svelte:head>

<main class="container mx-auto px-8 py-12 flex items-center">
	<div class="pt-8">
		<div class="lg:flex lg:flex-row-reverse lg:pt-16">
			<div class="w-full lg:w-1/3 mt-8 lg:mt-0">
				<enhanced:img
					alt="Michael Bonner"
					class="bg-opacity-100 rounded-lg w-full h-auto mix-blend-luminosity hover:bg-blend-darken hover:scale-105 hover:rotate-1 transition-transform"
					src={mainImage}
				/>
			</div>
			<div class="mt-8 lg:mt-0 w-full lg:w-2/3 lg:pr-8">
				<h1 class="leading-relaxed text-3xl lg:text-4xl tracking-wide lg:pr-8">
					Hi! I&apos;m{' '}
					<span class="font-medium whitespace-nowrap"> Michael Bonner</span>, a web developer in
					Salt Lake City, Utah. I run a small agency with some friends called{' '}
					<span class="whitespace-nowrap">
						<a
							class={classNames(
								'!text-3xl !lg:text-4xl !inline-block',
								'font-medium lg:leading-none lg:inline-block',
								classes.largeBodyLink
							)}
							href="https://bootpackdigital.com/">Bootpack Digital</a
						>.
					</span>
				</h1>
				<div class="inline-block my-8 lg:my-0">
					<a
						class={classNames('lg:flex text-2xl', classes.largeBodyLink, 'my-4 lg:my-8')}
						href="https://github.com/michaelbonner"
					>
						<span>See what I&apos;m up to on GitHub</span>
						<Github className="hidden lg:inline-block" />
					</a>
				</div>
				<div class="text-xl leading-relaxed">
					<p class="mt-4">
						I started making websites in high school back in 2003. I actually found a copy of my
						first site and{` `}
						<a class={classes.bodyLink} href="https://tuff.michaelbonner.dev/"> put it up here </a>
						. Epic, right? Don&apos;t miss the days of GeoCities. From there I made websites for people
						I knew, then people they knew, and so on. Making websites was definitely my thing. Since
						then I have worked at a handful of places making websites, web apps, and mobile apps. I also
						was a director at a digital agency for several years, and taught a boot camp for the University
						of Utah. I love what I do, and I&apos;m always down to chat about it.
					</p>
					<p class="mt-4">
						Also, I really like podcasts so I made a site to keep track of the podcasts I listen to.
						You can{' '}
						<a class={classes.bodyLink} href="https://podcasts.michaelbonner.dev/"
							>check that out here</a
						>.
					</p>
				</div>
			</div>
		</div>
		<div class="lg:mt-32 max-w-7xl">
			<H2>Projects I&apos;m proud of</H2>
			<ul class="mt-16 text-lg grid lg:grid-cols-2 gap-x-24 gap-y-12 lg:gap-y-24">
				{#each projects as project}
					<li class="ml-4 lg:ml-8 mt-8 lg:mt-0 grid gap-y-4">
						<p>
							<a class={classNames('!text-2xl', classes.largeBodyLink)} href={project.url}>
								{project.title}
							</a>
						</p>
						<p>{project.description}</p>
						<div class="flex justify-start space-x-4">
							{#if project.url}
								<p>
									<a class={classes.largeBodyLink} href={project.url}>
										<Link className="text-xl" />
										<span>View Project</span>
									</a>
								</p>
							{/if}
							{#if project.github}
								<p>
									<a class={classes.largeBodyLink} href={project.github}>
										<Github className="text-xl" />
										<span>Source</span>
									</a>
								</p>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="lg:mt-32 max-w-7xl">
			<H2>Things I&apos;ve built for fun</H2>
			<ul class="mt-16 text-lg grid lg:grid-cols-2 gap-x-24 gap-y-12 lg:gap-y-24">
				{#each otherThings as project}
					<li class="ml-4 lg:ml-8 mt-8 lg:mt-0 grid gap-y-4">
						<p>
							<a class={classNames('!text-2xl', classes.largeBodyLink)} href={project.url}>
								{project.title}
							</a>
						</p>
						<p>{project.description}</p>
						<div class="flex justify-start space-x-4">
							{#if project.url}
								<p>
									<a class={classes.largeBodyLink} href={project.url}>
										<Link className="text-xl" />
										<span>View Project</span>
									</a>
								</p>
							{/if}
							{#if project.github}
								<p>
									<a class={classes.largeBodyLink} href={project.github}>
										<Github className="text-xl" />
										<span>Source</span>
									</a>
								</p>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="lg:mt-32">
			<H2>Tools I use</H2>
			<ul class="mt-4 pl-12 list-outside list-disc text-lg lg:grid lg:grid-cols-4 gap-x-4 gap-y-2">
				{#each tools as tool}
					<li>{tool}</li>
				{/each}
			</ul>
		</div>
		<div class="lg:mt-32">
			<H2>Get in touch</H2>
			<ul class="mt-6 pl-4 text-lg lg:grid lg:grid-cols-4 gap-x-4 gap-y-2">
				<li>
					<div class="flex">
						<a class={classes.largeBodyLink} href="https://www.linkedin.com/in/michaelbonner/">
							<LinkedIn />
							<span class="pt-1">LinkedIn</span>
						</a>
						<span class="flex-1" />
					</div>
				</li>
				<li>
					<div class="flex">
						<a class={classes.largeBodyLink} href="https://www.instagram.com/michael__bonner">
							<Instagram />
							<span class="pt-1">Instagram</span>
						</a>
						<span class="flex-1" />
					</div>
				</li>
			</ul>
		</div>
	</div>
</main>
