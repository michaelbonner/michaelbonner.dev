<script lang="ts">
	import { blogArticles } from '$lib/data/blogArticles';
	import Seo from '../../components/Seo.svelte';
</script>

<Seo
	description="A web developer's blog from Salt Lake City, UT. Thoughts on development, technology, and random things worth writing about."
	ogImage="/og/blog.jpg"
	title="Developer Blog | Michael Bonner"
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/blog" />
</svelte:head>

<section class="py-16 sm:py-20 lg:py-28">
	<div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
		<div class="border-ink/20 border-b pb-10">
			<p class="text-tomato font-sans text-base font-medium sm:text-sm">Notes from the workbench</p>
			<h1
				class="mt-3 max-w-[15ch] text-6xl font-medium tracking-tight text-balance sm:text-7xl lg:text-8xl"
			>
				Web developer blog
			</h1>
			<p class="text-ink-muted mt-6 max-w-[58ch] font-sans text-xl text-pretty sm:text-lg/8">
				I&apos;m a full-time web developer, and I find things I want to write down, so I do from
				time to time.
			</p>
		</div>

		<ul class="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16" role="list">
			{#each blogArticles as article, index (article.slug)}
				<li class:lg:translate-y-16={index % 2 === 1}>
					<a aria-label={article.title} class="group outline-none" href={`/blog/${article.slug}`}>
						<div
							class="bg-screen overflow-hidden shadow-[7px_7px_0_var(--color-ink)] outline-1 -outline-offset-1 outline-black/10"
						>
							<enhanced:img
								alt=""
								class="aspect-[16/9] w-full object-cover group-hover:scale-[1.02] group-focus-visible:scale-[1.02] motion-safe:transition-transform motion-safe:duration-500"
								src={article.image}
							/>
						</div>
						<div class="border-ink/20 mt-6 border-t pt-4">
							<h2
								class="group-hover:text-tomato group-focus-visible:text-tomato max-w-[24ch] text-3xl font-medium tracking-tight text-balance sm:text-4xl"
							>
								{article.title}
							</h2>
							<p class="text-ink-muted mt-3 max-w-[65ch] font-sans text-base/7 text-pretty">
								{article.teaser}.
							</p>
							<div class="text-ink-soft mt-4 flex gap-2 font-sans text-base sm:text-sm">
								<time dateTime={article.publishedAt.toISOString()}
									>{article.publishedAt.toLocaleDateString()}</time
								>
								<span aria-hidden="true">&middot;</span>
								<span>{article.readingTime}</span>
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
		<p class="border-ink/20 mt-28 border-t pt-8 font-sans text-base sm:text-sm">
			I also wrote a <a class="text-tomato underline underline-offset-4" href="/ellie"
				>post about my pup Ellie</a
			>, who died in 2023.
		</p>
	</div>
</section>
