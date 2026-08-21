<script lang="ts">
	import { blogArticles } from '$lib/data/blogArticles';
	import type { Picture } from 'vite-imagetools';
	import OrganizationSchema from '../components/OrganizationSchema.svelte';
	import Seo from '../components/Seo.svelte';
	import Github from '../icons/Github.svelte';
	import Instagram from '../icons/Instagram.svelte';
	import LinkedIn from '../icons/LinkedIn.svelte';
	// images
	import mainImage from '$lib/images/on-the-beach-600.jpg?enhanced';
	import cookieParser from '$lib/images/projects/cookie-parser.jpg?enhanced';
	import dateFnsFormat from '$lib/images/projects/date-fns-format.jpg?enhanced';
	import daysUntil from '$lib/images/projects/days-until.jpg?enhanced';
	import dkow from '$lib/images/projects/dkow.jpg?enhanced';
	import easyCustomerFeedback from '$lib/images/projects/easycustomerfeedback.jpg?enhanced';
	import energySafeKids from '$lib/images/projects/energy-safe-kids.jpg?enhanced';
	import festivalThings from '$lib/images/projects/festival-things.jpg?enhanced';
	import githubRepositoriesViewer from '$lib/images/projects/github-repositories-viewer.jpg?enhanced';
	import hereKidsWin from '$lib/images/projects/here-kids-win.jpg?enhanced';
	import jMillsEnt from '$lib/images/projects/jmillsent.jpg?enhanced';
	import jobListing from '$lib/images/projects/joblisting.jpg?enhanced';
	import lazyUncle from '$lib/images/projects/lazy-uncle.jpg?enhanced';
	import nefPas from '$lib/images/projects/nef-pas.jpg?enhanced';
	import nhlArenas from '$lib/images/projects/nhl-arenas.jpg?enhanced';
	import ocr from '$lib/images/projects/ocr.jpg?enhanced';
	import officelunch from '$lib/images/projects/officelunch.jpg?enhanced';
	import pagespeed from '$lib/images/projects/pagespeed.jpg?enhanced';
	import podcasts from '$lib/images/projects/podcasts.jpg?enhanced';
	import randomStringGenerator from '$lib/images/projects/random-string-generator.jpg?enhanced';
	import routePicker from '$lib/images/projects/route-picker.jpg?enhanced';
	import screenshotMaker from '$lib/images/projects/screenshot-maker.jpg?enhanced';
	import utahMountainAdventures from '$lib/images/projects/utah-mountain-adventures.jpg?enhanced';
	import wasatchFabrication from '$lib/images/projects/wasatch-fabrication.jpg?enhanced';
	import wasatchCovers from '$lib/images/projects/wasatchcovers.jpg?enhanced';
	import whatToDoInSaltLake from '$lib/images/projects/whattodoinsaltlake.jpg?enhanced';
	import eightOneOneContest from '$lib/images/sites/811contest-org.webp?enhanced';
	import acceleratedEquityPlans from '$lib/images/sites/acceleratedep-com.webp?enhanced';
	import artistAmyBonner from '$lib/images/sites/amy-bonner-com.webp?enhanced';
	import blackThornSoftware from '$lib/images/sites/blackthornsoftware-com.webp?enhanced';
	import cosgriffSchool from '$lib/images/sites/cosgriff-org.webp?enhanced';
	import denverWindowWellCovers from '$lib/images/sites/denverwindowwellcovers-com.webp?enhanced';
	import energySafeLeaders from '$lib/images/sites/energysafeleaders-org.webp?enhanced';
	import waterColoringGame from '$lib/images/sites/games-nef1-org.webp?enhanced';
	import hanksGarageVenue from '$lib/images/sites/hanksgaragevenue-com.webp?enhanced';
	import heritageOfPreston from '$lib/images/sites/heritageofpreston-com.webp?enhanced';
	import heritageOfSoda from '$lib/images/sites/heritageofsoda-com.webp?enhanced';
	import homeOrganizingMadeEasy from '$lib/images/sites/homeorganizingme-com.webp?enhanced';
	import jeremyMillerDirector from '$lib/images/sites/jeremymillerdirector-com.webp?enhanced';
	import knowYourForce from '$lib/images/sites/knowyourforce-com.webp?enhanced';
	import lifeOrDeathDocumentary from '$lib/images/sites/lifeordeathdoc-com.webp?enhanced';
	import lostCreekContracting from '$lib/images/sites/lostcreekcontracting-com.webp?enhanced';
	import metacensus from '$lib/images/sites/metacensus-org.webp?enhanced';
	import mp4Compressor from '$lib/images/sites/mp4-compressor-bootpack-dev.webp?enhanced';
	import nef1Org from '$lib/images/sites/nef1-org.webp?enhanced';
	import pizzaSizePriceCalculator from '$lib/images/sites/pizza-michaelbonner-dev.webp?enhanced';
	import ravensFilmWorks from '$lib/images/sites/ravensfilmworks-com.webp?enhanced';
	import redirectsWizard from '$lib/images/sites/redirects-bootpack-dev.webp?enhanced';
	import swiftManager from '$lib/images/sites/swift-manager-com.webp?enhanced';

	type Project = {
		title: string;
		description: string;
		url: string;
		image: Picture;
		github?: string;
		blogPost?: string;
	};

	const projects: Project[] = [
		{
			title: "Primary Children's Hospital: Here Kids Win",
			description:
				"Primary Children's Hospital wanted a website to promote patient stories. Faktory reached out to me to build the site they had envisioned. I'm really happy with how this one came out. Next.js made so much of it really simple.",
			url: 'https://herekidswin.com/',
			github: 'https://github.com/FaktoryUtah/primary-childrens-stories',
			image: hereKidsWin
		},
		{
			title: 'Utah Mountain Adventures',
			description:
				'UMA had an outdated website that required a developer to manually change all the content, which made it difficult to keep content up to date. They wanted a fresh, new look and a more powerful CMS to update their website.',
			url: 'https://www.utahmountainadventures.com/',
			image: utahMountainAdventures
		},
		{
			title: 'Energy Safe Kids',
			description:
				'National Energy Foundation (NEF) runs a program to teach teachers and students about energy safety. They offer a custom website to sponsors to help them operate their program(s). We built a website generator that will allow NEF to create a website for each of their sponsors with only a few inputs.',
			url: 'https://energysafekids.org/',
			image: energySafeKids
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
				'An eCommerce site built using Gatsby.js. Load times went from over 10 seconds on their old platform, down to nearly instantaneous on the new one.',
			url: 'https://wasatchcovers.com/',
			image: wasatchCovers
		},
		{
			title: 'JME Film Co',
			description:
				'Built using Sanity CMS and Next.js. This one turned out really well and loads so quickly. I am happy about the way the custom video player turned out as well. Streaming provided by Vimeo, but skinned like JME.',
			url: 'https://www.jmillsent.com/',
			github: 'https://github.com/michaelbonner/jmillsent',
			image: jMillsEnt
		},
		{
			title: 'Wasatch Fabrication',
			description:
				'I helped the team at Wasatch Fabrication build a custom website for their new business. The site provides info about their services and allows potential customers to get a quote. We built out an admin area to allow the team to manage the content and the quotes.',
			url: 'https://www.wasatchfabrication.com/',
			image: wasatchFabrication
		},
		{
			title: 'NEF Programs Administration System',
			description:
				"Big ol' platform to administer all of their programs. Can't show you the code for security reasons, but I'm really proud of it, so I wanted to at least put it here. 😆",
			url: 'https://pas.nef1.org/',
			image: nefPas
		}
	];
	const otherThings: Project[] = [
		{
			title: 'What To Do In Salt Lake',
			description:
				'A curated guide to upcoming events, venues, and things to do around Salt Lake City. Search by category, browse by date, and find your next night out without digging through a dozen different sites.',
			url: 'https://whattodoinsaltlake.com/',
			image: whatToDoInSaltLake
		},
		{
			title: 'OfficeLunch',
			description:
				'A lunch coordination app for busy admins. Collect opt-ins, organize orders, and keep multiple organizations in sync, so Friday lunch runs itself instead of eating up your week.',
			url: 'https://officelunch.app/',
			image: officelunch
		},
		{
			title: 'EasyCustomerFeedback',
			description:
				'A beautifully simple feedback platform that helps product teams capture insights, prioritize features, and keep customers in the loop. Built to cut through the noise of heavier tools.',
			url: 'https://easycustomerfeedback.com/',
			image: easyCustomerFeedback
		},
		{
			title: 'Festival Things',
			description:
				'A festival lineup companion for music fans. Sort every artist into must-see, want-to-see, maybe, or pass, discover new acts, and connect your Spotify to see who you already love. Then share it with your group so you never miss a set.',
			url: 'https://festival-things.com/',
			image: festivalThings
		},
		{
			title: 'Job Listing',
			description:
				'Create a clean career page, collect applications, and track candidates without the clutter of a traditional ATS. A lightweight hiring tool for small and growing teams.',
			url: 'https://joblisting.app/',
			image: jobListing
		},
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
			blogPost: '/blog/screenshot-maker',
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
				'Sometimes you just want to have a timer to time a couple different routes and see which one is faster over time. This app does that. Plain and simple.',
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
			blogPost: '/blog/github-repositories-viewer-app',
			image: githubRepositoriesViewer
		},
		{
			title: 'PageSpeed Testing',
			description:
				'I wanted an easy way to test the performance of some of the sites I have built. This is a tool to help me see those results all on one page.',
			url: 'https://pagespeed.bootpack.dev/',
			github: 'https://github.com/michaelbonner/pagespeed',
			blogPost: '/blog/pagespeed-testing',
			image: pagespeed
		},
		{
			title: 'NHL Arenas To Visit',
			description:
				'The plan is to visit every home ice arena. Seems like a decent way to explore the US and Canada.',
			url: 'https://nhl.michaelbonner.dev/',
			github: 'https://github.com/michaelbonner/nhl-arenas-react',
			image: nhlArenas
		},
		{
			title: 'Days Until',
			description:
				'Have you ever wanted a site to just tell you how many days until a specific date? Well, here you go. Really I just needed something easy to start building Svelte projects.',
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
			name: "Hank's Garage Venue",
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
			name: 'Energy Safe Leaders',
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
			url: 'https://redirectswizard.com',
			host: 'redirectswizard.com',
			imgSrc: redirectsWizard
		},
		{
			name: 'Water coloring game',
			url: 'https://games.nef1.org/title/water',
			host: 'games.nef1.org',
			imgSrc: waterColoringGame
		},
		{
			name: 'MP4 Compressor',
			url: 'https://mp4-compressor.bootpack.dev',
			host: 'mp4-compressor.bootpack.dev',
			imgSrc: mp4Compressor
		},
		{
			name: '811 Contest',
			url: 'https://811contest.org',
			host: '811contest.org',
			imgSrc: eightOneOneContest
		},
		{
			name: 'Home Organizing Made Easy',
			url: 'https://www.homeorganizingme.com',
			host: 'homeorganizingme.com',
			imgSrc: homeOrganizingMadeEasy
		},
		{
			name: 'Lost Creek Contracting',
			url: 'https://lostcreekcontracting.com',
			host: 'lostcreekcontracting.com',
			imgSrc: lostCreekContracting
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

	const featuredProjects = projects.slice(0, 4);
	const projectArchive = [...projects.slice(4), ...otherThings];
</script>

<Seo
	title="Michael Bonner | Developer in Salt Lake, UT"
	description="Hi, I'm Michael Bonner. I'm a web developer in Salt Lake UT that specializes in business efficiency applications, APIs, and integrations."
	ogImage="/og/home.jpg"
/>

<OrganizationSchema name="Bootpack Digital" url="https://bootpackdigital.com" />

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/" />
</svelte:head>

<div class="home-page bg-paper text-ink">
	<section class="bg-tomato overflow-hidden py-10 sm:py-14 lg:py-20">
		<div
			class="mx-auto grid max-w-[90rem] gap-10 px-5 sm:px-8 lg:grid-cols-[13fr_9fr] lg:items-end lg:gap-16 lg:px-12"
		>
			<div class="min-w-0">
				<p class="text-ink-warm font-sans text-base font-medium tracking-wide sm:text-sm">
					Web developer · Salt Lake City
				</p>
				<h1
					class="text-cream mt-5 max-w-[14ch] text-6xl font-medium tracking-tight text-balance sm:text-7xl lg:text-8xl xl:text-9xl"
				>
					I make useful things for the web.
				</h1>
				<p
					class="text-ink-warm mt-8 max-w-[58ch] font-sans text-xl text-pretty sm:text-lg/8 lg:text-xl/8"
				>
					I&apos;m Michael Bonner. I&apos;ve built websites, apps, and odd little tools since 2003.
					These days I run
					<a
						class="font-semibold underline decoration-2 underline-offset-4"
						href="https://bootpackdigital.com/">Bootpack Digital</a
					>
					with friends.
				</p>
				<div class="mt-8 flex flex-wrap gap-3 font-sans text-base font-semibold sm:text-sm">
					<a
						class="bg-ink text-cream focus-visible:outline-cream inline-flex min-h-12 items-center px-5 py-3 outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-transform"
						href="#work">See selected work</a
					>
					<a
						class="text-ink-warm ring-ink-warm focus-visible:outline-cream inline-flex min-h-12 items-center px-5 py-3 ring-1 outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-transform"
						href="/contact">Start a conversation</a
					>
				</div>
			</div>

			<div class="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
				<div
					class="bg-butter text-ink-warm absolute -top-5 -right-3 z-10 rotate-3 px-4 py-2 font-sans text-base font-semibold shadow-[4px_4px_0_var(--color-ink)] sm:text-sm"
				>
					Still curious after 20+ years
				</div>
				<enhanced:img
					alt="Michael Bonner smiling on a beach"
					class="aspect-[4/5] w-full rotate-[-1.5deg] object-cover shadow-[12px_12px_0_var(--color-ink)] outline-1 -outline-offset-1 outline-black/10"
					fetchpriority="high"
					src={mainImage}
					sizes="(min-width: 1024px) 38vw, 90vw"
				/>
			</div>
		</div>
	</section>

	<section id="work" class="py-20 sm:py-24 lg:py-32">
		<div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
			<div class="border-ink/20 grid gap-6 border-b pb-8 lg:grid-cols-[13fr_9fr] lg:items-end">
				<h2
					class="max-w-[18ch] text-5xl font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl"
				>
					Selected work
				</h2>
				<p
					class="text-ink-muted max-w-[48ch] font-sans text-lg text-pretty sm:text-base/7 lg:justify-self-end"
				>
					Client work with a clear job to do, built to be fast, maintainable, and easy for real
					people to use.
				</p>
			</div>

			<ul class="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-16" role="list">
				{#each featuredProjects as project, projectIndex (project.title)}
					<li class:lg:translate-y-20={projectIndex % 2 === 1}>
						<a class="group outline-none" href={project.url} aria-label={`View ${project.title}`}>
							<div
								class="bg-screen overflow-hidden shadow-[8px_8px_0_var(--color-ink)] outline-1 -outline-offset-1 outline-black/10"
							>
								<enhanced:img
									alt=""
									class="aspect-[16/10] w-full object-cover group-hover:scale-[1.02] group-focus-visible:scale-[1.02] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out"
									loading={projectIndex <= 1 ? 'eager' : 'lazy'}
									src={project.image}
									sizes="(min-width: 1024px) 44vw, 92vw"
								/>
							</div>
							<div class="border-ink/20 mt-6 flex items-start justify-between gap-6 border-t pt-4">
								<div class="min-w-0">
									<p class="text-tomato font-sans text-base font-medium sm:text-sm">
										0{projectIndex + 1}
									</p>
									<h3
										class="mt-1 max-w-[24ch] text-3xl font-medium tracking-tight text-balance sm:text-4xl"
									>
										{project.title}
									</h3>
								</div>
								<p
									class="shrink-0 font-sans text-3xl group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-safe:transition-transform"
									aria-hidden="true"
								>
									↗
								</p>
							</div>
							<p class="text-ink-muted mt-4 max-w-[65ch] font-sans text-base/7 text-pretty">
								{project.description}
							</p>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="bg-ink text-cream mt-16 py-20 sm:py-24 lg:mt-24 lg:py-28">
		<div
			class="mx-auto grid max-w-[90rem] gap-12 px-5 sm:px-8 lg:grid-cols-[9fr_13fr] lg:gap-16 lg:px-12"
		>
			<div>
				<p class="text-butter font-sans text-base font-medium sm:text-sm">The side-project shelf</p>
				<h2 class="mt-3 max-w-[13ch] text-5xl font-medium tracking-tight text-balance sm:text-6xl">
					Small ideas, fully built.
				</h2>
				<p class="text-cream/80 mt-6 max-w-[46ch] font-sans text-lg text-pretty sm:text-base/7">
					Sometimes I build a tool because I need it. Sometimes I just want to see if an idea works.
				</p>
			</div>
			<ul class="divide-cream/20 border-cream/20 divide-y border-y" role="list">
				{#each projectArchive as project, index (project.title)}
					<li>
						<a
							class="group hover:text-butter focus-visible:text-butter grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-4 font-sans text-base outline-none sm:text-sm"
							href={project.url}
						>
							<p class="text-ink-soft tabular-nums">{String(index + 1).padStart(2, '0')}</p>
							<h3 class="min-w-0 text-xl font-medium sm:text-lg">{project.title}</h3>
							<p
								class="shrink-0 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-safe:transition-transform"
								aria-hidden="true"
							>
								↗
							</p>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="py-20 sm:py-24 lg:py-32">
		<div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
			<div class="grid gap-12 lg:grid-cols-[13fr_9fr] lg:gap-16">
				<div>
					<div class="border-ink/20 flex items-end justify-between gap-5 border-b pb-5">
						<h2 class="max-w-[15ch] text-5xl font-medium tracking-tight text-balance sm:text-6xl">
							Recent writing
						</h2>
						<a
							class="shrink-0 font-sans text-base font-semibold underline decoration-2 underline-offset-4 sm:text-sm"
							href="/blog">All posts</a
						>
					</div>
					<ul class="divide-ink/15 divide-y" role="list">
						{#each blogArticles.slice(0, 5) as article (article.slug)}
							<li>
								<a
									class="group grid gap-2 py-6 font-sans outline-none sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
									href={`/blog/${article.slug}`}
								>
									<h3
										class="group-hover:text-tomato group-focus-visible:text-tomato text-2xl font-medium tracking-tight text-balance sm:text-xl"
									>
										{article.title}
									</h3>
									<p class="text-ink-soft text-base sm:text-sm">{article.readingTime}</p>
									<p class="text-ink-muted max-w-[65ch] text-base/7 text-pretty sm:col-span-2">
										{article.teaser}.
									</p>
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<aside class="bg-butter p-6 shadow-[8px_8px_0_var(--color-ink)] sm:p-8 lg:self-start">
					<p class="font-sans text-base font-semibold sm:text-sm">Working set</p>
					<h2 class="mt-3 max-w-[16ch] text-4xl font-medium tracking-tight text-balance">
						Tools I reach for
					</h2>
					<ul class="mt-8 flex flex-wrap gap-2 font-sans text-base sm:text-sm" role="list">
						{#each tools as tool (tool)}
							<li class="border-ink/25 bg-cream border px-3 py-2">{tool}</li>
						{/each}
					</ul>
					<a
						class="bg-ink text-cream focus-visible:outline-ink mt-8 inline-flex min-h-12 items-center px-5 py-3 font-sans text-base font-semibold outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-transform sm:text-sm"
						href="/uses">See my full setup</a
					>
				</aside>
			</div>
		</div>
	</section>

	<section class="bg-blueprint text-cream py-20 sm:py-24">
		<div
			class="mx-auto grid max-w-[90rem] gap-10 px-5 sm:px-8 lg:grid-cols-[13fr_9fr] lg:items-end lg:gap-16 lg:px-12"
		>
			<div>
				<p class="text-butter font-sans text-base font-medium sm:text-sm">
					A lot of sites, over a lot of years
				</p>
				<h2
					class="mt-3 max-w-[15ch] text-5xl font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl"
				>
					Still shipping.
				</h2>
				<p class="text-cream/90 mt-6 max-w-[58ch] font-sans text-lg text-pretty sm:text-base/7">
					A running directory of client sites, experiments, and projects that are still out in the
					world.
				</p>
			</div>
			<div class="font-sans">
				<p class="text-7xl font-semibold tracking-tight tabular-nums sm:text-8xl">
					{otherSites.length}+
				</p>
				<p class="mt-2 text-lg sm:text-base">more sites in the archive.</p>
				<details class="border-cream/30 mt-6 border-t pt-5">
					<summary
						class="cursor-pointer text-lg font-semibold underline decoration-2 underline-offset-4 sm:text-base"
						>Open the site directory</summary
					>
					<ul class="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2" role="list">
						{#each otherSites as otherSite (otherSite.name)}
							<li>
								<a
									class="decoration-cream/40 hover:decoration-butter underline underline-offset-4"
									href={otherSite.url}
									target="_blank"
									rel="noreferrer">{otherSite.name}</a
								>
							</li>
						{/each}
					</ul>
				</details>
			</div>
		</div>
	</section>

	<section class="py-20 sm:py-24 lg:py-28">
		<div
			class="mx-auto grid max-w-[90rem] gap-10 px-5 sm:px-8 lg:grid-cols-[13fr_9fr] lg:items-end lg:gap-16 lg:px-12"
		>
			<div>
				<h2
					class="max-w-[12ch] text-5xl font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl"
				>
					Have a useful idea?
				</h2>
				<p class="text-ink-muted mt-6 max-w-[52ch] font-sans text-lg text-pretty sm:text-base/7">
					I&apos;m always up for talking through a hard problem, a new product, or a website that
					needs to work better.
				</p>
			</div>
			<div class="flex flex-wrap gap-3 font-sans text-base font-semibold sm:text-sm lg:justify-end">
				<a
					class="bg-tomato text-cream focus-visible:outline-tomato inline-flex min-h-12 items-center px-5 py-3 outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-transform"
					href="/contact">Get in touch</a
				>
				<a
					class="ring-ink focus-visible:outline-ink inline-flex min-h-12 items-center gap-2 px-5 py-3 ring-1 outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-transform"
					href="https://github.com/michaelbonner"><Github className="size-5 shrink-0" />GitHub</a
				>
				<a
					class="ring-ink focus-visible:outline-ink inline-flex min-h-12 items-center gap-2 px-5 py-3 ring-1 outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-transform"
					href="https://www.linkedin.com/in/michaelbonner/"
					><LinkedIn className="size-5 shrink-0" />LinkedIn</a
				>
				<a
					class="ring-ink focus-visible:outline-ink inline-flex min-h-12 items-center gap-2 px-5 py-3 ring-1 outline-none hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-transform"
					href="https://www.instagram.com/michael__bonner"
					><Instagram className="size-5 shrink-0" />Instagram</a
				>
			</div>
		</div>
	</section>
</div>
