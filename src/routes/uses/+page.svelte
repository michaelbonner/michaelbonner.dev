<script lang="ts">
	import Link from '../../icons/Link.svelte';
	import A from '../../components/A.svelte';
	import Seo from '../../components/Seo.svelte';
	import { classes } from '../../styles/classes';

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
			href: 'https://www.diabrowser.com/',
			title: 'Dia',
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
	const groups = [
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

<div class="container mx-auto px-6 sm:px-8">
	<header class="grid max-w-[60ch] gap-5 py-16 lg:py-24">
		<p class={classes.eyebrow}>Uses</p>
		<h1 class="text-h1 text-ink font-serif font-semibold">Software and other things I recommend</h1>
		<p class="text-lead text-ink-muted font-serif">
			I sometimes get asked about the things I use to build software and stay productive.
			Here&rsquo;s a list of some of my favorite stuff.
		</p>
	</header>

	<!--
		A two-column layout with the category name in the left rail: the heading
		stays visible beside its items instead of sitting on a decorative left
		border, and the items get a ruled list of their own.
	-->
	<div class="grid gap-16 pb-8 lg:gap-24">
		{#each groups as group (group.title)}
			<section
				class="border-rule grid gap-8 border-t pt-8 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16"
			>
				<div class="grid content-start gap-2 lg:sticky lg:top-24 lg:self-start">
					<h2 class="text-h3 text-ink font-serif font-semibold">{group.title}</h2>
					<p class={classes.label}>{group.items.length} items</p>
				</div>

				<ul class="grid">
					{#each group.items as item (item.title)}
						<li class="border-rule grid gap-1.5 border-b py-6 first:pt-0">
							<h3 class="text-h3 font-serif font-medium">
								<!--
									Quiet at rest: an underline beneath every h3-sized serif title
									turned the list into stripes. The icon carries the external cue,
									and the underline returns on hover.
								-->
								<A
									href={item.href}
									className="text-ink hover:text-accent no-underline hover:underline"
								>
									<span>{item.title}</span>
									<Link className="size-4 shrink-0 opacity-60" />
								</A>
							</h3>
							<p class="text-ink-muted max-w-[65ch] font-serif text-[1.0625rem] leading-relaxed">
								{item.description}
							</p>
							{#if item.isAffiliateLink}
								<p class={classes.label}>
									Affiliate link. I may receive a commission if you purchase through it.
								</p>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</div>
