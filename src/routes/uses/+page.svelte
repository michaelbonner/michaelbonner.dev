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
			href: 'https://www.raycast.com/hey/1fec4edf',
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
</script>

<Seo
	title="The tools i use as a developer in Salt Lake, UT"
	description="A short list of some of the tools I use on a regular basis to help me build products for clients."
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/uses" />
</svelte:head>

<div class="container mx-auto grid gap-8 px-8 py-12">
	<div>
		<h1 class="max-w-3xl text-4xl leading-relaxed tracking-wide lg:pr-8">
			Software and other things I recommend.
		</h1>
		<p class="max-w-xl text-lg">
			I sometimes get asked about the things I use to build software and stay productive. Here’s a
			list of some of my favorite stuff.
		</p>
	</div>

	<div class="mt-12 grid gap-24">
		<div
			class="grid border-l border-gray-300 pl-4 md:grid-cols-3 md:pl-8 xl:grid-cols-6 dark:border-gray-600"
		>
			<div class="text-xl">Workstation</div>
			<div class="grid gap-8 md:col-span-2 xl:col-span-5">
				{#each workstationItems as item (item.title)}
					<div>
						<span class="inline-block text-xl">
							<A href={item.href}>
								<Link />
								<span>{item.title}</span>
							</A>
						</span>
						<p class="max-w-xl text-lg text-gray-700 dark:text-gray-400">{item.description}</p>
						{#if item.isAffiliateLink}
							<p class="text-sm text-gray-500 dark:text-gray-400">
								*This is an affiliate link. I may receive a commission if you purchase through this
								link.
							</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div
			class="grid border-l border-gray-300 pl-4 md:grid-cols-3 md:pl-8 xl:grid-cols-6 dark:border-gray-600"
		>
			<div class="text-xl">Development Tools</div>
			<div class="grid gap-8 md:col-span-2 xl:col-span-5">
				{#each developmentItems as item (item.title)}
					<div>
						<span class="inline-block text-xl">
							<A href={item.href}>
								<Link />
								<span>{item.title}</span>
							</A>
						</span>
						<p class="max-w-xl text-lg text-gray-700 dark:text-gray-400">{item.description}</p>
						{#if item.isAffiliateLink}
							<p class="text-sm text-gray-500 dark:text-gray-400">
								*This is an affiliate link. I may receive a commission if you purchase through this
								link.
							</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div
			class="grid border-l border-gray-300 pl-4 md:grid-cols-3 md:pl-8 xl:grid-cols-6 dark:border-gray-600"
		>
			<div class="text-xl">Productivity Tools</div>
			<div class="grid gap-8 md:col-span-2 xl:col-span-5">
				{#each productivityItems as item (item.title)}
					<div>
						<span class="inline-block text-xl">
							<A href={item.href}>
								<Link />
								<span>{item.title}</span>
							</A>
						</span>
						<p class="max-w-xl text-lg text-gray-700 dark:text-gray-400">{item.description}</p>
						{#if item.isAffiliateLink}
							<p class="text-sm text-gray-500 dark:text-gray-400">
								*This is an affiliate link. I may receive a commission if you purchase through this
								link.
							</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
