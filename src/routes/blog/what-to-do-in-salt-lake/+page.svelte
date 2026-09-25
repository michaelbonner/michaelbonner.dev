<script>
	import whatToDoInSaltLake from '$lib/images/projects/whattodoinsaltlake.jpg?enhanced';
	import A from '../../../components/A.svelte';
	import Seo from '../../../components/Seo.svelte';
	import BlogPostSchema from '../../../components/BlogPostSchema.svelte';
</script>

<Seo
	description="I got tired of checking a dozen venue calendars to plan a weekend, so I built one calendar for all of Salt Lake"
	ogImage="/og/blog-what-to-do-in-salt-lake.jpg"
	ogType="article"
	title="What To Do In Salt Lake | Michael Bonner"
/>

<BlogPostSchema
	title="What To Do In Salt Lake"
	description="I got tired of checking a dozen venue calendars to plan a weekend, so I built one calendar for all of Salt Lake"
	url="https://michaelbonner.dev/blog/what-to-do-in-salt-lake"
	datePublished="2026-09-24T16:00:00.000Z"
	dateModified="2026-09-24T16:00:00.000Z"
	image={whatToDoInSaltLake.img.src}
/>

<svelte:head>
	<meta property="article:published_time" content="2026-09-24T16:00:00.000Z" />
	<meta name="publish_date" property="og:publish_date" content="2026-09-24T16:00:00.000Z" />

	<link rel="canonical" href="https://michaelbonner.dev/blog/what-to-do-in-salt-lake" />
</svelte:head>

<div class="container mx-auto px-6 py-12 sm:px-8 lg:py-20">
	<div class="prose w-full max-w-[68ch]">
		<h1>What To Do In Salt Lake</h1>
		<div class="prose-img:my-0 prose-figcaption:text-center mt-8">
			<p>
				Figuring out what to do on a Saturday in Salt Lake used to mean opening a bunch of tabs. The
				Urban Lounge calendar, the State Room, Red Butte Garden's concert series, whatever the
				farmers market is doing this week, and a couple of Instagram accounts that may or may not
				have posted about the thing I half-remembered. Every venue has its own calendar, and nobody
				puts them in one place.
			</p>

			<p>
				So I built <A className="inline" href="https://whattodoinsaltlake.com/"
					>What To Do In Salt Lake</A
				>. It's a free calendar of concerts, markets, comedy, sports, meetups, and everything else
				happening around the Salt Lake Valley.
			</p>

			<figure>
				<a href="https://whattodoinsaltlake.com/" aria-label="What To Do In Salt Lake website"
					><enhanced:img alt="What To Do In Salt Lake homepage" src={whatToDoInSaltLake} /></a
				>
			</figure>

			<h2>What it does</h2>

			<p>
				The homepage shows the next two weeks, one day at a time. If you just want to know what's
				going on tonight, tomorrow, or this weekend, there's a shortcut for each. You can also
				search the full calendar and filter by date, category, or keyword, or browse by venue or
				organizer if you already know where you want to go.
			</p>

			<p>
				If you make an account, you can favorite events and put them in lists, and you can share a
				list with friends so everyone's looking at the same plan. Every event also has an "add to
				calendar" link, so it ends up where you'll actually see it.
			</p>

			<h2>Where the events come from</h2>

			<p>
				This is the part that took the most work. There isn't one feed of Salt Lake events, so I
				wrote an importer for each source. Some venues have a clean API or a Ticketmaster listing.
				Others have a calendar page that I parse. Each importer runs on a schedule, and events that
				show up in more than one place (Ticketmaster and the venue's own site, usually) get
				deduplicated so you don't see the same show twice.
			</p>

			<p>
				For the one-off stuff that no importer would catch, there's a "Suggest an Event" form. On
				the admin side, I can paste in a link to an event page and have an AI model pull out the
				title, time, venue, and description to prefill the form. I still check every event before it
				goes live, but it turns a five-minute copy-and-paste job into a quick review. Visitors can
				also report an event when something is wrong, like a changed time or a canceled show.
			</p>

			<p>
				Venues and organizers can get editor access to manage their own pages and events, which
				means the people who know the details best can keep them up to date.
			</p>

			<h2>How it's built</h2>

			<p>
				It's a SvelteKit app with Svelte 5, backed by PostgreSQL through Drizzle ORM. Auth is
				handled by better-auth, forms are protected with Cloudflare Turnstile, and new submissions
				send me a Telegram notification so I can review them quickly. The design is intentionally
				quiet: I wanted it to feel like it was made by someone who lives here, not like another
				ticketing site with a buy button on every card.
			</p>

			<h2>Go find something to do</h2>

			<p>
				If you live in or around Salt Lake, give it a try at <A
					className="inline"
					href="https://whattodoinsaltlake.com/">whattodoinsaltlake.com</A
				>. And if you know about an event that isn't on there, suggest it. The calendar is only as
				good as what's in it, and I'd much rather hear about the thing I'm missing.
			</p>

			<p
				class="not-prose border-rule text-ui-sm text-ink-faint mt-16 flex flex-wrap gap-x-2 border-t pt-6 font-sans tracking-wide"
			>
				Published:
				<time dateTime="2026-09-24">24 September 2026</time>
			</p>
		</div>
	</div>
</div>
