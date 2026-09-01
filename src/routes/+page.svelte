<script lang="ts">
	import { resolve } from '$app/paths';
	import { blogArticles } from '$lib/data/blogArticles';
	import type { Picture } from 'vite-imagetools';
	import OrganizationSchema from '../components/OrganizationSchema.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
	import Section from '../components/Section.svelte';
	import Seo from '../components/Seo.svelte';
	import { classNames } from '../functions/classNames';
	import Github from '../icons/Github.svelte';
	import Instagram from '../icons/Instagram.svelte';
	import LinkedIn from '../icons/LinkedIn.svelte';
	import { classes } from '../styles/classes';
	// images
	import mainImage from '$lib/images/on-the-beach.jpg?enhanced';
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
	import pizza from '$lib/images/projects/pizza.jpg?enhanced';
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
	import andrewPollardCreative from '$lib/images/sites/andrewpollardcreative-com.webp?enhanced';
	import blackThornSoftware from '$lib/images/sites/blackthornsoftware-com.webp?enhanced';
	import cosgriffSchool from '$lib/images/sites/cosgriff-org.webp?enhanced';
	import crewView from '$lib/images/sites/crewview-com.webp?enhanced';
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
	import mp4Compressor from '$lib/images/projects/mp4-compressor.jpg?enhanced';
	import mp4ToOgvConverter from '$lib/images/projects/mp4-to-ogv.jpg?enhanced';
	import nef1Org from '$lib/images/sites/nef1-org.webp?enhanced';
	import pathwaysEnergy from '$lib/images/sites/pathwaysenergy-org.webp?enhanced';
	import ravensFilmWorks from '$lib/images/sites/ravensfilmworks-com.webp?enhanced';
	import redirectsWizard from '$lib/images/projects/redirects-wizard.jpg?enhanced';
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
				'A lunch coordination app for busy admins. Collect opt-ins, organize orders, and keep multiple organizations in sync — so Friday lunch runs itself instead of eating up your week.',
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
				'A festival lineup companion for music fans. Sort every artist into must-see, want-to-see, maybe, or pass, discover new acts, and connect your Spotify to see who you already love — then share it all with your group so you never miss a set.',
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
			title: 'Pizza Size Price Calculator',
			description:
				"Is ordering two mediums cheaper than one large? Is the Costco pizza actually a good deal? Punch in the sizes and prices and this figures out the cost per square inch, per serving, and per person so you don't have to.",
			url: 'https://pizza.michaelbonner.dev/',
			image: pizza
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
		},
		{
			title: 'Redirects Wizard',
			description:
				'A straightforward tool for creating and managing redirects without digging through configuration files.',
			url: 'https://redirectswizard.com',
			image: redirectsWizard
		},
		{
			title: 'MP4 Compressor',
			description:
				'A simple browser-based utility for compressing MP4 videos so they are easier to share and publish.',
			url: 'https://mp4-compressor.bootpack.dev',
			image: mp4Compressor
		},
		{
			title: 'MP4 to OGV Converter',
			description:
				'A browser-based utility for converting MP4 videos to OGV files with a simple drag-and-drop upload.',
			url: 'https://mp4-to-ogv.bootpack.dev',
			image: mp4ToOgvConverter
		}
	];

	const developerToolTitles = new Set([
		'Screenshot Maker',
		'GitHub Repository Collaborators Viewer',
		'PageSpeed Testing',
		'date-fns Format Helper',
		'Cookie Parser',
		'OCR Reader',
		'Random String Generator',
		'Redirects Wizard',
		'MP4 Compressor',
		'MP4 to OGV Converter'
	]);
	const justForFunTitles = new Set([
		'What To Do In Salt Lake',
		'Festival Things',
		'Lazy Uncle',
		'Podcasts I Listen To',
		'Days Until',
		'NHL Arenas To Visit',
		'Pizza Size Price Calculator',
		'Which Route Is Faster'
	]);
	const saasProjects = otherThings.filter(
		(project) => !developerToolTitles.has(project.title) && !justForFunTitles.has(project.title)
	);
	const developerTools = otherThings.filter((project) => developerToolTitles.has(project.title));
	const justForFunProjects = otherThings.filter((project) => justForFunTitles.has(project.title));

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
			name: 'Pathways Energy',
			url: 'https://www.pathwaysenergy.org/',
			host: 'pathwaysenergy.org',
			imgSrc: pathwaysEnergy
		},
		{
			name: 'CrewView',
			url: 'https://www.crewview.com/',
			host: 'crewview.com',
			imgSrc: crewView
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
			name: 'Water coloring game',
			url: 'https://games.nef1.org/title/water',
			host: 'games.nef1.org',
			imgSrc: waterColoringGame
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
		},
		{
			name: 'Andrew Pollard Creative',
			url: 'https://andrewpollardcreative.com',
			host: 'andrewpollardcreative.com',
			imgSrc: andrewPollardCreative
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
		'Astro',
		'Gatsby',
		'GraphQL',
		'Prisma',
		'Apollo',
		'Laravel',
		'MongoDB',
		'MySQL',
		'PostgreSQL',
		'WordPress',
		'Shopify',
		'Cloudflare'
	];
	// Shown under the hero photo, where the column previously ran empty.
	const facts = [
		{ label: 'Based in', value: 'Salt Lake City, UT' },
		{ label: 'Building since', value: '2003' },
		{ label: 'Agency', value: 'Bootpack Digital' },
		{ label: 'Focus', value: 'Apps, APIs, integrations' }
	];

	const socials = [
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/michaelbonner/' },
		{ label: 'Instagram', href: 'https://www.instagram.com/michael__bonner' }
	];
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

<!--
	The hero is deliberately asymmetric: the sentence gets the wide column and the
	photo the narrow one, with the photo's caption block filling what used to be a
	tall empty gap underneath it.
-->
<div class="container mx-auto px-6 sm:px-8">
	<header class="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-20 lg:py-24">
		<div class="grid content-start gap-8">
			<p class={classes.eyebrow}>Web developer &middot; Salt Lake City, Utah</p>

			<h1 class="text-h1 text-ink max-w-[30ch] font-serif font-semibold">
				Hi! I&apos;m Michael Bonner, a web developer in Salt Lake City, Utah. I run a small agency
				with some friends called <a
					href="https://bootpackdigital.com/"
					class="text-accent decoration-accent/40 hover:decoration-accent underline decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-150 ease-out"
					>Bootpack Digital</a
				>.
			</h1>

			<div class="text-lead text-ink-muted grid max-w-[65ch] gap-4 font-serif">
				<p>
					I started making websites in high school back in 2003. I actually found a copy of my first
					site and <a class={classes.bodyLink} href="https://tuff.michaelbonner.dev/"
						>put it up here</a
					>. Epic, right? I don&apos;t miss the days of GeoCities. From there I made websites for
					people I knew, then people they knew, and so on. Making websites was definitely my thing.
					Since then I have worked at a handful of places making websites, web apps, and mobile
					apps. I was also a director at a digital agency for several years, and taught a boot camp
					for the University of Utah. I love what I do, and I&apos;m always down to chat about it.
				</p>
				<p>
					I really like podcasts, so I made a site to share the podcasts I listen to. You can <a
						class={classes.bodyLink}
						href="https://podcasts.michaelbonner.dev/">check that out here</a
					>.
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				<a class={classes.button} href="https://github.com/michaelbonner">
					<Github className="size-[1.1em]" />
					<span>See what I&apos;m up to on GitHub</span>
				</a>
				<a class={classes.buttonQuiet} href={resolve('/contact')}>Get in touch</a>
			</div>
		</div>

		<div class="grid content-start gap-6">
			<enhanced:img
				alt="Michael Bonner on the beach"
				class="border-rule shadow-lift h-auto w-full rounded-xl border object-cover"
				fetchpriority="high"
				src={mainImage}
				sizes="(min-width: 1024px) 420px, 100vw"
			/>

			<!--
				Fills the column under the photo, which previously ran empty for the
				full height of the intro copy.
			-->
			<dl class="border-rule grid gap-3 border-t pt-6">
				{#each facts as fact (fact.label)}
					<div class="flex items-baseline justify-between gap-4">
						<dt class={classes.label}>{fact.label}</dt>
						<dd class="text-ui text-ink text-right font-sans">{fact.value}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</header>

	<div class="grid gap-16 pb-8">
		<Section
			id="projects"
			eyebrow="Client work"
			heading="Projects I'm proud of"
			meta={`${projects.length} projects`}
		>
			<ul class="grid gap-8 lg:grid-cols-2 lg:gap-10">
				{#each projects as project, projectIndex (project.title)}
					<li class="grid">
						<ProjectCard {...project} eager={projectIndex <= 1} />
					</li>
				{/each}
			</ul>
		</Section>

		<Section
			id="my-saas"
			eyebrow="Products"
			heading="My SaaS"
			meta={`${saasProjects.length} projects`}
		>
			<ul class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each saasProjects as project (project.title)}
					<li class="grid">
						<ProjectCard {...project} compact />
					</li>
				{/each}
			</ul>
		</Section>

		<Section
			id="just-for-fun"
			eyebrow="Side projects"
			heading="Just for fun"
			meta={`${justForFunProjects.length} projects`}
		>
			<ul class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each justForFunProjects as project (project.title)}
					<li class="grid">
						<ProjectCard {...project} compact />
					</li>
				{/each}
			</ul>
		</Section>

		<Section
			id="developer-tools"
			eyebrow="Utilities"
			heading="Developer tools"
			meta={`${developerTools.length} tools`}
		>
			<ul class="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each developerTools as project (project.title)}
					<li class="grid">
						<ProjectCard {...project} compact />
					</li>
				{/each}
			</ul>
		</Section>

		<Section
			id="other-client-sites"
			eyebrow="Client work"
			heading="Other client sites"
			description="Sites I've built or helped build over the years."
			meta={`${otherSites.length} sites`}
		>
			<!--
				A quiet list rather than another card grid: these are links with a
				favicon, not projects with a story, and three card grids in a row would
				flatten the page into one texture.
			-->
			<ul class="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each otherSites as otherSite (otherSite.name)}
					<li class="border-rule border-b">
						<a
							class="group hover:text-accent flex items-center gap-3 py-3 no-underline transition-colors duration-150 ease-out"
							href={otherSite.url}
							target="_blank"
							rel="noreferrer"
						>
							<enhanced:img
								class="size-6 shrink-0 rounded-sm"
								alt=""
								src={otherSite.imgSrc}
								loading="lazy"
							/>
							<span class="text-ui text-ink group-hover:text-accent font-sans transition-colors"
								>{otherSite.name}</span
							>
						</a>
					</li>
				{/each}
			</ul>
		</Section>

		<Section eyebrow="Writing" heading="Recent blog articles" meta={`${blogArticles.length} posts`}>
			<!--
				Dates matter for judging whether writing is current, so each entry
				carries one rather than sitting in an undated bulleted list.
			-->
			<ul class="border-rule grid border-t">
				{#each blogArticles as article (article.slug)}
					<li class="border-rule border-b">
						<a
							class="group flex flex-col gap-1 py-4 no-underline sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
							href={`/blog/${article.slug}`}
						>
							<span
								class="text-h3 text-ink group-hover:text-accent font-serif font-medium transition-colors duration-150 ease-out"
							>
								{article.title}
							</span>
							<span class={classNames(classes.label, 'shrink-0 tabular-nums')}>
								<time datetime={article.publishedAt.toISOString()}>
									{article.publishedAt.toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric'
									})}
								</time>
								<span aria-hidden="true"> &middot; </span>
								{article.readingTime}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</Section>

		<Section eyebrow="Stack" heading="Tools I use">
			<!-- Chips read as a set at a glance; a four-column bulleted list read as a form. -->
			<ul class="flex flex-wrap gap-2">
				{#each tools as tool (tool)}
					<li
						class="border-rule bg-surface text-ui text-ink-muted rounded-full border px-3.5 py-1.5 font-sans"
					>
						{tool}
					</li>
				{/each}
			</ul>
		</Section>

		<Section eyebrow="Contact" heading="Get in touch">
			<ul class="grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
				{#each socials as social (social.label)}
					<li>
						<a
							href={social.href}
							class={classNames(
								classes.surfaceInteractive,
								'flex items-center gap-3 p-4 no-underline'
							)}
						>
							<span class="text-accent">
								{#if social.label === 'LinkedIn'}
									<LinkedIn />
								{:else}
									<Instagram />
								{/if}
							</span>
							<span class="text-ui text-ink font-sans font-medium">{social.label}</span>
						</a>
					</li>
				{/each}
			</ul>
		</Section>
	</div>
</div>
