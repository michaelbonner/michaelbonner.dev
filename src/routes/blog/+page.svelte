<script lang="ts">
	import Image from 'svimg';
	import Seo from '../../components/Seo.svelte';
</script>

<Seo description="Just writing down some things" title="Developer Blog | Michael Bonner" />

<main class="relative pt-8 pb-8 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
	<div class="container mx-auto px-8 py-12">
		<div class="prose dark:prose-invert max-w-3xl">
			<h1>Web Developer Blog</h1>
			<p>
				I&apos;m a full-time web developer, and I find things I want to write down, so I do from
				time to time.
			</p>
		</div>

		<div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-2 xl:grid-cols-3 lg:max-w-none">
			<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
				<a class="flex-shrink-0 leading-[0]" href="/blog/i-made-an-extension">
					<Image
						class="h-48 w-full object-cover"
						src="/images/chrome-basecamp-ui-extension.jpg"
						alt="I made my first Chrome extension"
						immediate={true}
					/>
				</a>
				<div class="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
					<a href="/blog/i-made-an-extension" class="block mt-2">
						<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
							I made my first Chrome extension
						</p>
						<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
							Really simple one, and it was really easy to make
						</p>
					</a>
					<div class="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-200">
						<time dateTime="2022-05-01T00:00:00+00:00">2022-05-01</time>
						<span aria-hidden="true">&middot;</span>
						<span>2 minute read</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
				<a
					class="flex-shrink-0 leading-[0]"
					href="/blog/getting-started-as-a-web-developer-in-2022"
				>
					<Image
						class="h-48 w-full object-cover"
						src="/images/tuff-website-screenshot-trimmed-600.jpg"
						alt="Where I think new web software developers should start in 2022"
						immediate={true}
					/>
				</a>
				<div class="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
					<a href="/blog/getting-started-as-a-web-developer-in-2022" class="block mt-2">
						<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
							Where I think new web software developers should start in 2022
						</p>
						<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
							The guide I wish I had when getting started
						</p>
					</a>
					<div class="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-200">
						<time dateTime="2022-03-09T00:00:00+00:00">2022-03-09</time>
						<span aria-hidden="true">&middot;</span>
						<span>15 minute read</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
				<a class="flex-shrink-0 leading-[0]" href="/blog/set-up-some-aliases">
					<Image
						class="h-48 w-full object-cover"
						src="/images/iterm-aliases-trimmed-600.jpg"
						alt="Set up some aliases"
						immediate={true}
					/>
				</a>
				<div class="flex-1 bg-white dark:bg-gray-700 p-6 grid gap-y-4">
					<a href="/blog/set-up-some-aliases" class="block mt-2">
						<p class="text-xl font-semibold text-gray-900 dark:text-gray-300">
							Set up some aliases
						</p>
						<p class="mt-3 text-base text-gray-500 dark:text-gray-200">
							Just use them, they will change your life
						</p>
					</a>
					<div class="flex space-x-1 justify-end text-sm text-gray-500 dark:text-gray-200">
						<time dateTime="2021-07-15T00:00:00+00:00">2021-07-15</time>
						<span aria-hidden="true">&middot;</span>
						<span>5 minute read</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
