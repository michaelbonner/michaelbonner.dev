<script lang="ts">
	import Link from '../../icons/Link.svelte';
	import A from '../../components/A.svelte';
	import Seo from '../../components/Seo.svelte';

	type UsesItem = {
		description: string;
		href: string;
		title: string;
		isAffiliateLink?: boolean;
	};

	const workstationItems: UsesItem[] = [
		{
			title: 'MacBook Pro 14" M4 Pro - 48GB RAM',
			href: 'https://www.apple.com/shop/buy-mac/macbook-pro/14-inch-space-black-standard-display-apple-m4-pro-with-14-core-cpu-and-20-core-gpu-24gb-memory-1tb',
			description: "This computer is a beast. I've been using it since November 2024 and love it."
		},
		{
			title: 'Apple Studio Display',
			href: 'https://www.apple.com/studio-display/',
			description:
				'I prefer to have one high resolution monitor instead of two different monitors. Check out Raycast below for some helpful window snapping stuff.'
		},
		{
			href: 'https://www.shure.com/en-US/products/microphones/mv7?variant=MV7-K',
			title: 'Shure MV7 Microphone',
			description:
				'I want people to be able to hear me clearly when making videos and on Zoom calls. This microphone is great for that.'
		},
		{
			href: 'https://www.apple.com/airpods-max/',
			title: 'AirPods Max',
			description:
				"Can't say enough good things about these. If you have Apple stuff they are definitely worth the price."
		}
	];

	const developmentItems: UsesItem[] = [
		{
			title: `Cursor`,
			href: 'https://cursor.com/en',
			description: `Cursor is a pretty neat AI code editor. I've been using it for a few months now and it's pretty cool.`
		},
		{
			title: 'TablePlus',
			href: 'https://tableplus.com/',
			description: 'Great software for working with databases.'
		},
		{
			title: 'Warp',
			href: 'https://app.warp.dev/referral/2KN4LJ',
			description:
				'Like the regular terminal, but looks better and has more features. The AI features are super helpful.'
		},
		{
			title: 'oh my zsh',
			href: 'https://ohmyz.sh/',
			description: 'Big fan of the zsh shell. Check out zsh-autosuggestions as well.'
		},
		{
			title: 'Fira Code',
			href: 'https://github.com/tonsky/FiraCode',
			description: 'Nice looking coding font face'
		},
		{
			title: 'Docker Desktop',
			href: 'https://www.docker.com/products/docker-desktop/',
			description: 'Docker Desktop is invaluable for developers.'
		}
	];

	const productivityItems: UsesItem[] = [
		{
			href: 'https://1password.com/',
			title: '1Password',
			description: 'The best password manager I have used'
		},
		{
			href: 'https://arc.net/',
			title: 'Arc Browser',
			description: 'A great browser for Mac'
		},
		{
			href: 'https://raycast.com/?via=michael-bonner',
			title: 'Raycast',
			description:
				'Spotlight replacement for Mac with window management, clipboard history, and more',
			isAffiliateLink: true
		},
		{
			href: 'https://polypane.app/?via=bootpack',
			title: 'Polypane',
			description:
				'Test your website in multiple viewports at once. Great for responsive design work.',
			isAffiliateLink: true
		},
		{
			href: 'https://folivora.ai/',
			title: 'BetterTouchTool',
			description:
				'A productivity powerhouse for me. I use it for window snapping, keyboard shortcuts, and more.'
		},
		{
			href: 'https://savvycal.com/?via=michael-bonner',
			title: 'SavvyCal',
			description:
				'Makes it super easy to just send a URL to a client and let them pick a meeting time that works for them'
		},
		{
			href: 'https://www.notion.com/',
			title: 'Notion',
			description: 'Great for keeping things organized; super powerful and configurable'
		},
		{
			href: 'https://ref.flowvoice.ai/bootpack',
			title: 'Wispr Flow',
			description:
				'An amazing AI tool for transcribing. I use it all the time for emails and project communications.',
			isAffiliateLink: true
		},
		{
			href: 'https://referworkspace.app.goo.gl/iyUE',
			title: 'Google Workspace',
			description:
				'Google Workspace has been the easiest and most reliable provider of email, calendar, and shared drive storage.',
			isAffiliateLink: true
		},
		{
			href: 'https://hetzner.cloud/?ref=rmvsAZEWOxGE',
			title: 'Hetzner',
			description: 'Hetzner is a great cloud provider for cloud projects.',
			isAffiliateLink: true
		}
	];

	const sections = [
		{ title: 'Workstation', items: workstationItems },
		{ title: 'Development tools', items: developmentItems },
		{ title: 'Productivity tools', items: productivityItems }
	];
</script>

<Seo
	title="The tools I use as a developer in Salt Lake, UT"
	description="A short list of some of the tools I use on a regular basis to help me build products for clients."
	ogImage="/og/uses.jpg"
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/uses" />
</svelte:head>

<section class="py-16 sm:py-20 lg:py-28">
	<div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
		<p class="text-tomato font-sans text-base font-medium sm:text-sm">The working set</p>
		<h1
			class="mt-3 max-w-[16ch] text-6xl font-medium tracking-tight text-balance sm:text-7xl lg:text-8xl"
		>
			Software and other things I recommend.
		</h1>
		<p class="text-ink-muted mt-6 max-w-[58ch] font-sans text-xl text-pretty sm:text-lg/8">
			I sometimes get asked about the things I use to build software and stay productive. Here's a
			list of some of my favorite stuff.
		</p>

		<div class="border-ink/20 mt-14 grid gap-20 border-t pt-10 lg:mt-20 lg:gap-28">
			{#each sections as section, sectionIndex (section.title)}
				<section class="grid gap-8 lg:grid-cols-[7fr_15fr] lg:gap-16">
					<div>
						<p class="text-tomato font-sans text-base font-medium tabular-nums sm:text-sm">
							0{sectionIndex + 1}
						</p>
						<h2
							class="mt-2 max-w-[14ch] text-4xl font-medium tracking-tight text-balance sm:text-5xl"
						>
							{section.title}
						</h2>
					</div>
					<ul class="divide-ink/15 border-ink/20 divide-y border-y" role="list">
						{#each section.items as item (item.title)}
							<li class="py-6">
								<h3 class="font-sans text-xl font-semibold sm:text-lg">
									<A href={item.href}><Link /><span>{item.title}</span></A>
								</h3>
								<p class="text-ink-muted mt-2 max-w-[65ch] font-sans text-base/7 text-pretty">
									{item.description}
								</p>
								{#if item.isAffiliateLink}
									<p class="text-ink-soft mt-2 font-sans text-base sm:text-sm">
										Affiliate link. I may receive a commission if you purchase through this link.
									</p>
								{/if}
							</li>
						{/each}
					</ul>
				</section>
			{/each}
		</div>
	</div>
</section>
