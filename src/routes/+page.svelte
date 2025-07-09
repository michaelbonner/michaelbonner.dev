<script lang="ts">
	import { blogArticles } from '$lib/data/blogArticles';
	import clsx from 'clsx';
	import A from '../components/A.svelte';
	import H2 from '../components/H2.svelte';
	import Seo from '../components/Seo.svelte';
	import { classNames } from '../functions/classNames';
	import Github from '../icons/Github.svelte';
	import Instagram from '../icons/Instagram.svelte';
	import Link from '../icons/Link.svelte';
	import LinkedIn from '../icons/LinkedIn.svelte';
	import { classes } from '../styles/classes';

	// images
	import mainImage from '$lib/images/on-the-beach-600.jpg?enhanced';
	import cookieParser from '$lib/images/projects/cookie-parser.jpg?enhanced';
	import crewView from '$lib/images/projects/crewview.jpg?enhanced';
	import dateFnsFormat from '$lib/images/projects/date-fns-format.jpg?enhanced';
	import daysUntil from '$lib/images/projects/days-until.jpg?enhanced';
	import dkow from '$lib/images/projects/dkow.jpg?enhanced';
	import githubRepositoriesViewer from '$lib/images/projects/github-repositories-viewer.jpg?enhanced';
	import hereKidsWin from '$lib/images/projects/here-kids-win.jpg?enhanced';
	import jMillsEnt from '$lib/images/projects/jmillsent.jpg?enhanced';
	import lazyUncle from '$lib/images/projects/lazy-uncle.jpg?enhanced';
	import nefPas from '$lib/images/projects/nef-pas.jpg?enhanced';
	import nhlArenas from '$lib/images/projects/nhl-arenas.jpg?enhanced';
	import ocr from '$lib/images/projects/ocr.jpg?enhanced';
	import pagespeed from '$lib/images/projects/pagespeed.jpg?enhanced';
	import podcasts from '$lib/images/projects/podcasts.jpg?enhanced';
	import randomStringGenerator from '$lib/images/projects/random-string-generator.jpg?enhanced';
	import routePicker from '$lib/images/projects/route-picker.jpg?enhanced';
	import screenshotMaker from '$lib/images/projects/screenshot-maker.jpg?enhanced';
	import wasatchCovers from '$lib/images/projects/wasatchcovers.jpg?enhanced';
	import acceleratedEquityPlans from '$lib/images/sites/acceleratedep-com.png?enhanced';
	import artistAmyBonner from '$lib/images/sites/amy-bonner-com.png?enhanced';
	import blackThornSoftware from '$lib/images/sites/blackthornsoftware-com.png?enhanced';
	import cosgriffSchool from '$lib/images/sites/cosgriff-org.png?enhanced';
	import denverWindowWellCovers from '$lib/images/sites/denverwindowwellcovers-com.png?enhanced';
	import energySafeLeaders from '$lib/images/sites/energysafeleaders-org.png?enhanced';
	import waterColoringGame from '$lib/images/sites/games-nef1-org.png?enhanced';
	import hanksGarageVenue from '$lib/images/sites/hanksgaragevenue-com.png?enhanced';
	import heritageOfPreston from '$lib/images/sites/heritageofpreston-com.png?enhanced';
	import heritageOfSoda from '$lib/images/sites/heritageofsoda-com.png?enhanced';
	import jeremyMillerDirector from '$lib/images/sites/jeremymillerdirector-com.png?enhanced';
	import knowYourForce from '$lib/images/sites/knowyourforce-com.png?enhanced';
	import lifeOrDeathDocumentary from '$lib/images/sites/lifeordeathdoc-com.png?enhanced';
	import metacensus from '$lib/images/sites/metacensus-org.png?enhanced';
	import nef1Org from '$lib/images/sites/nef1-org.png?enhanced';
	import pasNef1Org from '$lib/images/sites/pas-nef1-org.png?enhanced';
	import pizzaSizePriceCalculator from '$lib/images/sites/pizza-michaelbonner-dev.png?enhanced';
	import ravensFilmWorks from '$lib/images/sites/ravensfilmworks-com.png?enhanced';
	import redirectsWizard from '$lib/images/sites/redirects-bootpack-dev.png?enhanced';
	import swiftManager from '$lib/images/sites/swift-manager-com.png?enhanced';

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
			title: 'Screenshot Maker',
			description:
				'I needed a way to make screenshots of projects. This is a simple tool that allows you to do just that.',
			url: 'https://screenshot-maker.bootpack.dev/',
			github: 'https://github.com/michaelbonner/screenshot-maker',
			image: screenshotMaker
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

	const otherSites = [
		{
			name: 'MetaCensus',
			url: 'https://metacensus.org',
			host: 'metacensus.org',
			imgSrc: metacensus
		},
		{
			name: 'NEF Programs Administration System',
			url: 'https://pas.nef1.org',
			host: 'pas.nef1.org',
			imgSrc: pasNef1Org
		},
		{
			name: 'NEF Corporate Site',
			url: 'https://nef1.org',
			host: 'nef1.org',
			imgSrc: nef1Org
		},
		{
			name: 'Heritage of Preston',
			url: 'https://www.heritageofpreston.com',
			host: 'heritageofpreston.com',
			imgSrc: heritageOfPreston
		},
		{
			name: 'Heritage of Soda',
			url: 'https://www.heritageofsoda.com',
			host: 'heritageofsoda.com',
			imgSrc: heritageOfSoda
		},
		{
			name: 'Jeremy Miller Director',
			url: 'https://jeremymillerdirector.com',
			host: 'jeremymillerdirector.com',
			imgSrc: jeremyMillerDirector
		},
		{
			name: 'Ravens Film Works',
			url: 'https://ravensfilmworks.com',
			host: 'ravensfilmworks.com',
			imgSrc: ravensFilmWorks
		},
		{
			name: 'Ravenspace',
			url: 'https://theravenspace.com',
			host: 'theravenspace.com',
			imgSrc: ravensFilmWorks
		},
		{
			name: 'Life or Death Documentary',
			url: 'https://www.lifeordeathdoc.com',
			host: 'lifeordeathdoc.com',
			imgSrc: lifeOrDeathDocumentary
		},
		{
			name: 'Hanks Garage Venue',
			url: 'https://www.hanksgaragevenue.com',
			host: 'hanksgaragevenue.com',
			imgSrc: hanksGarageVenue
		},
		{
			name: 'Accelerated Equity Plans',
			url: 'https://www.acceleratedep.com',
			host: 'acceleratedep.com',
			imgSrc: acceleratedEquityPlans
		},
		{
			name: 'EnergySafeLeaders',
			url: 'https://energysafeleaders.org/leaders',
			host: 'energysafeleaders.org',
			imgSrc: energySafeLeaders
		},
		{
			name: 'Swift Manager',
			url: 'https://www.swift-manager.com',
			host: 'swift-manager.com',
			imgSrc: swiftManager
		},
		{
			name: 'Pizza Size Price Calculator',
			url: 'https://pizza.michaelbonner.dev',
			host: 'pizza.michaelbonner.dev',
			imgSrc: pizzaSizePriceCalculator
		},
		{
			name: 'Artist Amy Bonner',
			url: 'https://www.amy-bonner.com',
			host: 'amy-bonner.com',
			imgSrc: artistAmyBonner
		},
		{
			name: 'Denver Window Well Covers',
			url: 'https://denverwindowwellcovers.com',
			host: 'denverwindowwellcovers.com',
			imgSrc: denverWindowWellCovers
		},
		{
			name: 'J.E. Cosgriff School',
			url: 'https://cosgriff.org',
			host: 'cosgriff.org',
			imgSrc: cosgriffSchool
		},
		{
			name: 'BlackThorn Software',
			url: 'https://www.blackthornsoftware.com',
			host: 'blackthornsoftware.com',
			imgSrc: blackThornSoftware
		},
		{
			name: 'Know Your Force',
			url: 'https://knowyourforce.com',
			host: 'knowyourforce.com',
			imgSrc: knowYourForce
		},
		{
			name: 'Redirects Wizard',
			url: 'https://redirects.bootpack.dev',
			host: 'redirects.bootpack.dev',
			imgSrc: redirectsWizard
		},
		{
			name: 'Water coloring game',
			url: 'https://games.nef1.org/title/water',
			host: 'games.nef1.org',
			imgSrc: waterColoringGame
		}
	].sort((a, b) => a.name.localeCompare(b.name));

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

<main class="container mx-auto flex items-center px-8 py-12">
	<div class="pt-8">
		<div class="lg:flex lg:flex-row-reverse lg:pt-16">
			<div class="mt-8 w-full lg:mt-0 lg:w-1/3">
				<enhanced:img
					alt="Michael Bonner"
					class="bg-opacity-100 h-auto w-full rounded-lg mix-blend-luminosity transition-transform hover:scale-105 hover:rotate-1 hover:bg-blend-darken"
					src={mainImage}
				/>
			</div>
			<div class="mt-8 w-full lg:mt-0 lg:w-2/3 lg:pr-8">
				<h1 class="text-3xl leading-relaxed tracking-wide lg:pr-8 lg:text-4xl">
					Hi! I&apos;m&nbsp;
					<span class="font-medium whitespace-nowrap"> Michael Bonner</span>, a web developer in
					Salt Lake City, Utah. I run a small agency with some friends called&nbsp;
					<span class="whitespace-nowrap">
						<a
							class={classNames(
								'!lg:text-4xl inline-block! text-3xl!',
								'font-medium lg:inline-block lg:leading-none',
								classes.largeBodyLink
							)}
							href="https://bootpackdigital.com/">Bootpack Digital</a
						>.
					</span>
				</h1>
				<div class="my-8 inline-block lg:my-0">
					<a
						class={classNames('text-2xl lg:flex', classes.largeBodyLink, 'my-4 lg:my-8')}
						href="https://github.com/michaelbonner"
					>
						<span>See what I&apos;m up to on GitHub</span>
						<Github className="hidden lg:inline-block" />
					</a>
				</div>
				<div class="text-xl leading-relaxed">
					<p class="mt-4">
						I started making websites in high school back in 2003. I actually found a copy of my
						first site and&nbsp;
						<a class={classes.bodyLink} href="https://tuff.michaelbonner.dev/"> put it up here </a>
						. Epic, right? Don&apos;t miss the days of GeoCities. From there I made websites for people
						I knew, then people they knew, and so on. Making websites was definitely my thing. Since
						then I have worked at a handful of places making websites, web apps, and mobile apps. I also
						was a director at a digital agency for several years, and taught a boot camp for the University
						of Utah. I love what I do, and I&apos;m always down to chat about it.
					</p>
					<p class="mt-4">
						Also, I really like podcasts so I made a site to keep track of the podcasts I listen to.
						You can&nbsp;
						<a class={classes.bodyLink} href="https://podcasts.michaelbonner.dev/"
							>check that out here</a
						>.
					</p>
				</div>
			</div>
		</div>

		<div class="max-w-7xl lg:mt-32">
			<H2>Projects I&apos;m proud of</H2>
			<ul class="mt-8 grid gap-x-24 gap-y-12 text-lg lg:mt-16 lg:grid-cols-2 lg:gap-y-24">
				{#each projects as project, projectIndex (project.title)}
					<li class="mt-8 grid gap-y-4 lg:mt-0 lg:ml-8">
						<a
							aria-label={`View ${project.title}`}
							class="transition-transform hover:scale-105 hover:rotate-1"
							href={project.url}
						>
							<enhanced:img
								alt={project.title}
								class="rounded-lg border border-gray-100 shadow-sm md:max-w-md dark:border-gray-900/40"
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
			<ul class="mt-8 grid gap-x-24 gap-y-12 text-lg lg:mt-16 lg:grid-cols-2 lg:gap-y-24">
				{#each otherThings as project (project.title)}
					<li class="mt-8 grid gap-y-4 lg:mt-0 lg:ml-8">
						{#if project.image}
							<a
								aria-label={`View ${project.title}`}
								class="transition-transform hover:scale-105 hover:rotate-1"
								href={project.url}
							>
								<enhanced:img
									alt={project.title}
									class="rounded-lg border border-gray-100 shadow-sm md:max-w-md dark:border-gray-900/40"
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
			<H2>Some Other Sites</H2>
			<ul class="mt-8 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:ml-8 lg:grid-cols-3 xl:grid-cols-4">
				{#each otherSites as otherSite (otherSite.name)}
					<li class="flex gap-4">
						<div>
							<enhanced:img
								class="size-6"
								alt={otherSite.name}
								src={otherSite.imgSrc}
								loading="lazy"
							/>
						</div>
						<div>
							{otherSite.name}<br /><A href={otherSite.url}>
								{otherSite.url.replace(/https:\/\/(www\.)?/, '')}
							</A>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<div class="max-w-7xl lg:mt-32">
			<H2>Recent Blog Articles</H2>
			<ul class="mt-8 ml-12 list-outside list-disc">
				{#each blogArticles as article (article.slug)}
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
			<ul class="mt-4 list-outside list-disc gap-x-4 gap-y-2 pl-12 text-lg lg:grid lg:grid-cols-4">
				{#each tools as tool (tool)}
					<li>{tool}</li>
				{/each}
			</ul>
		</div>
		<div class="lg:mt-32">
			<H2>Get in touch</H2>
			<ul class="mt-6 gap-x-4 gap-y-2 pl-4 text-lg lg:grid lg:grid-cols-4">
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
