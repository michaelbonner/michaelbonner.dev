<script lang="ts">
	import Link from '../../icons/Link.svelte';
	import A from '../../components/A.svelte';
	import Seo from '../../components/Seo.svelte';

	type UsesItem = {
		description: string;
		href: string;
		title: string;
	};

	const workstationItems: UsesItem[] = [
		{
			title: 'MacBook Pro 14" M1 Pro - 32GB RAM',
			href: 'https://www.apple.com/shop/buy-mac/macbook-pro/14-inch-space-gray-10-core-cpu-16-core-gpu-1tb',
			description: "This computer is a beast. I've been using it since January 2022 and love it."
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
			title: `VS Code`,
			href: 'https://code.visualstudio.com/',
			description: `I use VS Code for all my development needs. I've tried a few different editors, but I always come back to VS Code.`
		},
		{
			title: 'TablePlus',
			href: 'https://tableplus.com/',
			description: 'Great software for working with databases.'
		},
		{
			title: 'Warp',
			href: 'https://www.warp.dev/',
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
			description: 'Docker Desktop is invaluable for local development'
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
			href: 'https://raycast.com/',
			title: 'Raycast',
			description:
				'Spotlight replacement for Mac with window management, clipboard history, and more'
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
			href: 'https://www.notion.so/',
			title: 'Notion',
			description: 'Great for keeping things organized; super powerful and configurable'
		}
	];
</script>

<Seo
	title="Michael Bonner | Developer in Salt Lake, UT"
	description="Hi, I'm Michael Bonner. I'm a web developer in Salt Lake UT"
/>

<main class="grid gap-8 container mx-auto px-8 py-12">
	<div>
		<h1 class="leading-relaxed text-4xl tracking-wide lg:pr-8 max-w-3xl">
			Software and other things I recommend.
		</h1>
		<p class="text-lg max-w-xl">
			I sometimes get asked about the things I use to build software and stay productive. Here’s a
			list of some of my favorite stuff.
		</p>
	</div>

	<div class="grid gap-24 mt-12">
		<div
			class="grid md:grid-cols-3 xl:grid-cols-6 border-l border-gray-300 dark:border-gray-600 pl-4 md:pl-8"
		>
			<div class="text-xl">Workstation</div>
			<div class="md:col-span-2 xl:col-span-5 grid gap-8">
				{#each workstationItems as item}
					<div>
						<span class="text-xl inline-block">
							<A href={item.href}>
								<Link />
								<span>{item.title}</span>
							</A>
						</span>
						<p class="max-w-xl text-lg text-gray-700 dark:text-gray-400">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="grid md:grid-cols-3 xl:grid-cols-6 border-l border-gray-300 dark:border-gray-600 pl-4 md:pl-8"
		>
			<div class="text-xl">Development Tools</div>
			<div class="md:col-span-2 xl:col-span-5 grid gap-8">
				{#each developmentItems as item}
					<div>
						<span class="text-xl inline-block">
							<A href={item.href}>
								<Link />
								<span>{item.title}</span>
							</A>
						</span>
						<p class="max-w-xl text-lg text-gray-700 dark:text-gray-400">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<div
			class="grid md:grid-cols-3 xl:grid-cols-6 border-l border-gray-300 dark:border-gray-600 pl-4 md:pl-8"
		>
			<div class="text-xl">Productivity Tools</div>
			<div class="md:col-span-2 xl:col-span-5 grid gap-8">
				{#each productivityItems as item}
					<div>
						<span class="text-xl inline-block">
							<A href={item.href}>
								<Link />
								<span>{item.title}</span>
							</A>
						</span>
						<p class="max-w-xl text-lg text-gray-700 dark:text-gray-400">{item.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>
