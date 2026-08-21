<script lang="ts">
	import { blogArticles } from '$lib/data/blogArticles';
	import Seo from '../../components/Seo.svelte';
	import { classNames } from '../../functions/classNames';
	import { classes } from '../../styles/classes';

	// Newest first, so the index does not depend on the data file's ordering.
	const articles = $derived(
		[...blogArticles].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
	);

	const formatDate = (date: Date) =>
		date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
</script>

<Seo
	description="A web developer's blog from Salt Lake City, UT. Thoughts on development, technology, and random things worth writing about."
	ogImage="/og/blog.jpg"
	title="Developer Blog | Michael Bonner"
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/blog" />
</svelte:head>

<div class="container mx-auto px-6 sm:px-8">
	<header class="grid max-w-[60ch] gap-5 py-16 lg:py-24">
		<p class={classes.eyebrow}>Writing</p>
		<h1 class="text-h1 text-ink font-serif font-semibold">Web Developer Blog</h1>
		<p class="text-lead text-ink-muted font-serif">
			I&apos;m a full-time web developer, and I find things I want to write down, so I do from time
			to time.
		</p>
	</header>

	<!--
		The first post gets a wide row of its own so the index has a focal point;
		the rest fall into an even grid below it.
	-->
	<ul class="border-rule grid gap-8 border-t pt-10 lg:grid-cols-3 lg:gap-10">
		{#each articles as article, index (article.slug)}
			<li class={classNames('grid', index === 0 ? 'lg:col-span-3' : '')}>
				<a
					href={`/blog/${article.slug}`}
					class={classNames(
						classes.surfaceInteractive,
						'group grid overflow-hidden no-underline',
						index === 0 ? 'lg:grid-cols-2' : ''
					)}
				>
					<div class="overflow-hidden">
						<enhanced:img
							alt=""
							class={classNames(
								'bg-ground-sunken w-full object-cover object-top',
								'transition-transform duration-500 ease-out group-hover:scale-[1.02]',
								index === 0 ? 'aspect-16/10 lg:h-full' : 'aspect-16/10'
							)}
							loading={index === 0 ? 'eager' : 'lazy'}
							src={article.image}
							sizes={index === 0
								? '(min-width: 1024px) 640px, 100vw'
								: '(min-width: 1024px) 400px, 100vw'}
						/>
					</div>

					<div class="grid content-start gap-3 p-6 lg:p-8">
						<p class={classNames(classes.label, 'tabular-nums')}>
							<time datetime={article.publishedAt.toISOString()}>
								{formatDate(article.publishedAt)}
							</time>
							<span aria-hidden="true"> &middot; </span>
							{article.readingTime}
						</p>

						<h2
							class={classNames(
								'text-ink group-hover:text-accent font-serif font-semibold transition-colors duration-150 ease-out',
								index === 0 ? 'text-h2' : 'text-h3'
							)}
						>
							{article.title}
						</h2>

						<p class="text-ink-muted font-serif text-[1.0625rem] leading-relaxed">
							{article.teaser}
						</p>

						{#if article.tags?.length}
							<ul class="mt-1 flex flex-wrap gap-1.5">
								{#each article.tags as tag (tag)}
									<li
										class="border-rule text-ui-sm text-ink-faint rounded-full border px-2.5 py-0.5 font-sans"
									>
										{tag}
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>

	<p class="text-lead text-ink-muted mt-12 font-serif">
		I also wrote a <a class={classes.bodyLink} href="/ellie">post about my pup Ellie</a>, who died
		in 2023.
	</p>
</div>
