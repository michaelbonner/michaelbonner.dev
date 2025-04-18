<script lang="ts">
	import mainImage from '$lib/images/on-the-beach-600.jpg?enhanced';
	import H2 from '../components/H2.svelte';
	import Seo from '../components/Seo.svelte';
	import { classNames } from '../functions/classNames';
	import Github from '../icons/Github.svelte';
	import Instagram from '../icons/Instagram.svelte';
	import Link from '../icons/Link.svelte';
	import LinkedIn from '../icons/LinkedIn.svelte';
	import { classes } from '../styles/classes';

	import cookieParser from '$lib/images/projects/cookie-parser.jpg?enhanced&w=448';
	import crewView from '$lib/images/projects/crewview.jpg?enhanced&w=448';
	import dateFnsFormat from '$lib/images/projects/date-fns-format.jpg?enhanced&w=448';
	import daysUntil from '$lib/images/projects/days-until.jpg?enhanced&w=448';
	import dkow from '$lib/images/projects/dkow.jpg?enhanced&w=448';
	import githubRepositoriesViewer from '$lib/images/projects/github-repositories-viewer.jpg?enhanced&w=448';
	import hereKidsWin from '$lib/images/projects/here-kids-win.jpg?enhanced&w=448';
	import jMillsEnt from '$lib/images/projects/jmillsent.jpg?enhanced&w=448';
	import lazyUncle from '$lib/images/projects/lazy-uncle.jpg?enhanced&w=448';
	import nefPas from '$lib/images/projects/nef-pas.jpg?enhanced&w=448';
	import nhlArenas from '$lib/images/projects/nhl-arenas.jpg?enhanced&w=448';
	import ocr from '$lib/images/projects/ocr.jpg?enhanced&w=448';
	import pagespeed from '$lib/images/projects/pagespeed.jpg?enhanced&w=448';
	import podcasts from '$lib/images/projects/podcasts.jpg?enhanced&w=448';
	import randomStringGenerator from '$lib/images/projects/random-string-generator.jpg?enhanced&w=448';
	import routePicker from '$lib/images/projects/route-picker.jpg?enhanced&w=448';
	import wasatchCovers from '$lib/images/projects/wasatchcovers.jpg?enhanced&w=448';
	import { blogArticles } from '$lib/data/blogArticles';
	import clsx from 'clsx';

	const projects = [
		{
			title: "Primary Children's Hospital: Here Kids Win",
			description:
				"Primary Children's Hospital wanted a website to promote patient stories. Faktory reached out to me to build the site they had envisioned. I'm really happy with how this one came out. Next.js made so much of it really simple.",
			url: 'https://herekidswin.com/',
			github: 'https://github.com/FaktoryUtah/primary-childrens-stories',
			image: hereKidsWin
		},
		{
			title: 'DKOW Law',
			description:
				'A marketing website built for a law firm in Salt Lake that has the largest recoveries for clients in Utah. I worked with a local designer to make the site look and feel like a modern law firm. Even though it is built with WordPress, it still loads super fast.',
			url: 'https://www.dkow.com/',
			image: dkow
		},
		{
			title: 'Wasatch Covers',
			description:
				'An eCommerce site built using Gatsby.js. Load times went from over 10 seconds on their old platform, down to near instantaneous on the new one.',
			url: 'https://wasatchcovers.com/',
			image: wasatchCovers
		},
		{
			title: 'JME Film Co',
			description:
				'Built using Sanity CMS and Next.js. This one turned out really good and loads so fast.',
			url: 'https://www.jmillsent.com/',
			github: 'https://github.com/michaelbonner/jmillsent',
			image: jMillsEnt
		},
		{
			title: 'CrewView',
			description:
				"I'm part of a team building a web application that helps companies manage their projects, people, and assets in a way that's easy to use and intuitive.",
			url: 'https://crewview.com/',
			image: crewView
		},
		{
			title: 'NEF Programs Administration System',
			description:
				"Big ol' platform to administer all of their programs. Can't show you the code for security reasons, but I'm really proud of it so I wanted to at least put it here. 😆",
			url: 'https://pas.nef1.org/',
			image: nefPas
		}
	];
	const otherThings = [
		{
			title: 'Lazy Uncle',
			description:
				"I have a lot of people in my family, and sometimes it's hard to keep track of their birthdays and how old they are. Lazy Uncle makes it a little easier. Give it a shot and let me know what you think.",
			url: 'https://www.lazyuncle.net/',
			github: 'https://github.com/michaelbonner/lazy-uncle',
			image: lazyUncle
		},
		{
			title: 'Podcasts I Listen To',
			description:
				'I am really into podcasts, and people ask what podcasts they should listen to. I built this site to make it easier to share the really good ones.',
			url: 'https://podcasts.michaelbonner.dev/',
			github: 'https://github.com/michaelbonner/podcasts-i-listen-to',
			image: podcasts
		},
		{
			title: 'Which Route Is Faster',
			description:
				'Sometimes you just wanna have a timer to time a couple different routes and see which one is faster over time. This is made to do just that.',
			url: 'https://www.whichrouteisfaster.com/',
			github: 'https://github.com/michaelbonner/route-picker',
			image: routePicker
		},
		{
			title: 'GitHub Repository Collaborators Viewer',
			description:
				"GitHub (on purpose) doesn't make it very easy for individuals to see a list of all your repos and who has access to them. This little app helps you see that.",
			url: 'https://github-repositories-viewer.bootpack.dev/',
			github: 'https://github.com/michaelbonner/github-repositories-viewer',
			image: githubRepositoriesViewer
		},
		{
			title: 'PageSpeed Testing',
			description:
				'I wanted an easy way to test the performance of some of the sites I have built. This is a tool to help me see those results all on one page.',
			url: 'https://pagespeed.bootpack.dev/',
			github: 'https://github.com/michaelbonner/pagespeed',
			image: pagespeed
		},
		{
			title: 'NHL Arenas To Visit',
			description:
				'The plan is to visit every home ice arena. Seems like a decent way to explore the US and Canada',
			url: 'https://nhl.michaelbonner.dev/',
			github: 'https://github.com/michaelbonner/nhl-arenas-react',
			image: nhlArenas
		},
		{
			title: 'Days Until',
			description:
				'You ever wanted a site to just tell you how many days until a specific date. Well here you go. Really I just needed something easy to start building Svelte projects.',
			url: 'https://days-until.michaelbonner.dev/',
			github: 'https://github.com/michaelbonner/days-until',
			image: daysUntil
		},
		{
			title: 'date-fns Format Helper',
			description:
				'I always forget date-fns format strings. This site offers some sane defaults and makes it easy to see what the format string will look like.',
			url: 'https://date-fns.michaelbonner.dev/',
			github: 'https://github.com/michaelbonner/date-fns-format',
			image: dateFnsFormat
		},
		{
			title: 'Cookie Parser',
			description:
				"Now you don't have to wonder what all the cookies on a site mean. Just copy and paste the cookies string and the site will tell you what cookies are present with links to learn more.",
			url: 'https://cookie-parser.michaelbonner.dev/',
			github: 'https://github.com/michaelbonner/cookie-parser',
			image: cookieParser
		},
		{
			title: 'OCR Reader',
			description:
				'Just a little example of how Tesseract can be used to read text from an uploaded image.',
			url: 'https://ocr.michaelbonner.dev/',
			github: 'https://github.com/michaelbonner/tesseract-test',
			image: ocr
		},
		{
			title: 'Random String Generator',
			description:
				"I got tired of Googling for a site and getting a bunch of cruft I don't need when trying to generate a random string, so I built a dead simple replacement.",
			url: 'https://random-string-generator.michaelbonner.dev/',
			github: 'https://github.com/michaelbonner/random-string-generator',
			image: randomStringGenerator
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

<main class="container flex items-center py-12 px-8 mx-auto">
	<div class="pt-8">
		<div class="lg:flex lg:flex-row-reverse lg:pt-16">
			<div class="mt-8 w-full lg:mt-0 lg:w-1/3">
				<enhanced:img
					alt="Michael Bonner"
					class="w-full h-auto bg-opacity-100 rounded-lg transition-transform hover:scale-105 hover:rotate-1 mix-blend-luminosity hover:bg-blend-darken"
					src={mainImage}
				/>
			</div>
			<div class="mt-8 w-full lg:pr-8 lg:mt-0 lg:w-2/3">
				<h1 class="text-3xl tracking-wide leading-relaxed lg:pr-8 lg:text-4xl">
					Hi! I&apos;m{' '}
					<span class="font-medium whitespace-nowrap"> Michael Bonner</span>, a web developer in
					Salt Lake City, Utah. I run a small agency with some friends called{' '}
					<span class="whitespace-nowrap">
						<a
							class={classNames(
								'text-3xl! !lg:text-4xl inline-block!',
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

		<div class="max-w-7xl lg:mt-32">
			<H2>Projects I&apos;m proud of</H2>
			<ul class="grid gap-y-12 gap-x-24 mt-8 text-lg lg:grid-cols-2 lg:gap-y-24 lg:mt-16">
				{#each projects as project, projectIndex}
					<li class="grid gap-y-4 mt-8 lg:mt-0 lg:ml-8">
						<a
							aria-label={`View ${project.title}`}
							class="transition-transform hover:scale-105 hover:rotate-1"
							href={project.url}
						>
							<enhanced:img
								alt={project.title}
								class="rounded-lg md:max-w-md"
								loading={projectIndex <= 1 ? 'eager' : 'lazy'}
								src={project.image}
								sizes="(min-width:768px) 448px, 100vw"
							/>
						</a>
						<p>
							<a class={classNames('text-2xl!', classes.largeBodyLink)} href={project.url}>
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
		<div class="max-w-7xl lg:mt-32">
			<H2>Things I&apos;ve built for fun</H2>
			<ul class="grid gap-y-12 gap-x-24 mt-8 text-lg lg:grid-cols-2 lg:gap-y-24 lg:mt-16">
				{#each otherThings as project}
					<li class="grid gap-y-4 mt-8 lg:mt-0 lg:ml-8">
						{#if project.image}
							<a
								aria-label={`View ${project.title}`}
								class="transition-transform hover:scale-105 hover:rotate-1"
								href={project.url}
							>
								<enhanced:img
									alt={project.title}
									class="rounded-lg md:max-w-md"
									loading="lazy"
									src={project.image}
									sizes="(min-width:768px) 448px, 100vw"
								/>
							</a>
						{/if}
						<p>
							<a class={classNames('text-2xl!', classes.largeBodyLink)} href={project.url}>
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

		<div class="max-w-7xl lg:mt-32">
			<H2>Recent Blog Articles</H2>
			<ul class="mt-8 list-disc list-outside ml-12">
				{#each blogArticles as article}
					<li class="py-1">
						<a class={clsx(classes.bodyLink, 'w-full md:w-auto')} href={`/blog/${article.slug}`}>
							{article.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="lg:mt-32">
			<H2>Tools I use</H2>
			<ul class="gap-y-2 gap-x-4 pl-12 mt-4 text-lg list-disc list-outside lg:grid lg:grid-cols-4">
				{#each tools as tool}
					<li>{tool}</li>
				{/each}
			</ul>
		</div>
		<div class="lg:mt-32">
			<H2>Get in touch</H2>
			<ul class="gap-y-2 gap-x-4 pl-4 mt-6 text-lg lg:grid lg:grid-cols-4">
				<li>
					<div class="flex">
						<a class={classes.largeBodyLink} href="https://www.linkedin.com/in/michaelbonner/">
							<LinkedIn />
							<span class="pt-1">LinkedIn</span>
						</a>
						<span class="flex-1"></span>
					</div>
				</li>
				<li>
					<div class="flex">
						<a class={classes.largeBodyLink} href="https://www.instagram.com/michael__bonner">
							<Instagram />
							<span class="pt-1">Instagram</span>
						</a>
						<span class="flex-1"></span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</main>
