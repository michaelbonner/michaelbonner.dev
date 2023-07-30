<script lang="ts">
	import Seo from '../../../components/Seo.svelte';
	import { classes } from '../../../styles/classes';
	import tuffWebsiteScreenshot from '../$lib/images/tuff-website-screenshot.webp';
	import michaelbonnerDevGithubScreenshot from '../$lib/images/michaelbonner-dev-github-screenshot.webp';
</script>

<Seo
	description="Are you thinking about becoming a web developer? Where should you start? Here's my two cents as a full time web developer with almost 20 years of experience."
	ogImage={tuffWebsiteScreenshot}
	ogType="article"
	title="Where I think new web software developers should start | Michael Bonner"
/>

<svelte:head>
	<meta property="article:published_time" content="2022-03-08T20:58:46.469Z" />
	<meta name="publish_date" property="og:publish_date" content="2022-03-08T20:58:46.469Z" />
</svelte:head>

<main class="container mx-auto px-8 py-12 flex items-center">
	<div class="w-full max-w-3xl prose dark:prose-invert">
		<div class="pt-8">
			<div class="lg:pt-24">
				<div>
					<h1 class="text-4xl tracking-wider leading-[1.3em] lg:pr-8">
						Where I think new web software developers should start in 2022
					</h1>
				</div>
			</div>
			<div class="lg:mt-24 text-lg max-w-5xl">
				<p class="text-base">TL;DR: Learn the absolute basics, and build as much as you can.</p>
				<hr class="border-gray-300 mx-16" />
				<p>
					Getting started as a web developer is hard; hopefully, I can help a little bit. Keep in
					mind this is only my opinion, you should find other people&apos;s opinions as well. I have
					found things that work for me, but I could be completely wrong on what works for you.
				</p>
				<p>
					A real quick note about boot camps: I taught a couple of cohorts for the University of
					Utah and had a good experience and made great connections. Several students found work as
					web software engineers and are now gainfully employed. If you think that will help you and
					you have the money, go for it. But don&apos;t think a boot camp is a substitute for
					grinding your way through the learning process. It&apos;s a slog either way.
				</p>
				<h2>
					Find something simple you want to build, and force yourself to learn enough to build it
				</h2>
				<p>
					Start real simple. Could just be an &ldquo;about me&rdquo; page. My first public website
					was a dumb thing for my friends in high school. It was lame, but I was really excited
					about it. I made changes to it all the time. It got me excited to build more websites.
					Find something like that. It might be tempting to use an online website builder, but I
					think you&apos;ll be better off learning the basics the old-fashioned way.
				</p>
				<figure>
					<a href="https://tuff.michaelbonner.dev/">
						<img src={tuffWebsiteScreenshot} alt="Tuff website screenshot" width={1400} />
					</a>
					<figcaption class="text-center">See how cringey that thing is?</figcaption>
				</figure>
				<p>
					Learn basic{' '}
					<a class={classes.bodyLink} href="https://www.w3schools.com/html/"> HTML </a>{' '}
					and{' '}<a class={classes.bodyLink} href="https://www.w3schools.com/css/"> CSS </a>.
					Codecademy (<a
						class={classes.bodyLink}
						href="https://www.codecademy.com/catalog/language/html-css">codecademy.com</a
					>) has really good interactive tutorials to get you started. Trudge through it, and then
					build your small idea. It doesn&apos;t have to be pretty, it just needs to display some
					text.
				</p>
				<p>
					Download Visual Studio Code (<a
						class={classes.bodyLink}
						href="https://code.visualstudio.com">code.visualstudio.com</a
					>) and start making files. VS Code will help you find syntax errors in your code and make
					it easier to fix them.
				</p>
				<p>
					Launch your first website. Even if your first site is horrible, launch it. For real, just
					launch it. Get that thing out there. You can host your site using Netlify for free. Just
					zip it up and launch it. (<a class={classes.bodyLink} href="https://app.netlify.com/drop"
						>app.netlify.com/drop</a
					>) Tell your friends about your new site. Tell your parents about it. Tell me about it.{` `}(<a
						class={classes.bodyLink}
						href="https://www.linkedin.com/in/michaelbonner/">linkedin.com/in/michaelbonner/</a
					>)
				</p>
				<h2>Build, build, build</h2>
				<p>
					The best way to learn is to find things you want to build and get to work. It&apos;s a lot
					easier to learn when you&apos;re solving a problem <em>you want</em> to solve. Look for tutorials
					about how to do the exact thing you are stuck on. Keep your appetite small, and let your curiosity
					carry you.
				</p>
				<p>
					Find local businesses that don&apos;t have a web presence and build them a site. Even if
					it&apos;s free. Get as much experience as you can building all the sites you can. When
					you&apos;re done with the site put your name at the bottom with a link to find you. The
					link could be your LinkedIn profile, or your Instagram, or some way for people to get in
					touch with you. If you do good work people will notice and reach out.
				</p>
				<h2>Get to the next level</h2>
				<figure>
					<a href="https://github.com/michaelbonner/michaelbonner.dev">
						<img
							alt="michaelbonner.dev github screenshot"
							src={michaelbonnerDevGithubScreenshot}
							width="1400"
						/>
					</a>
					<figcaption class="text-center">
						A screenshot of the Github repository for this website
					</figcaption>
				</figure>
				<p>
					Learn Git. (<a class={classes.bodyLink} href="https://lab.github.com/">lab.github.com</a>)
					Git is a tool to keep track of changes to your code. It allows you to see what changes you
					made over time and roll things back if you need to. You can create branches to keep new
					ideas separate from production-ready code, and then merge it back in when you are ready.
					You can have your website automatically deployed when you push your code. Everybody uses
					Git, and you&apos;ll lose out on job opportunities if you don&apos;t take the time to
					learn it.
				</p>
				<p>
					Learn Javascript. Javascript is the programming language of the internet. Almost every
					site you use uses Javascript to enable user interactions, and many run javascript on the
					server to interface with the database. Wes Bos has a great course to get you started. (<a
						class={classes.bodyLink}
						href="https://javascript30.com/">javascript30.com</a
					>)
				</p>
				<p>
					Keep learning. Watch tutorials. Listen to podcasts (<a
						class={classes.bodyLink}
						href="https://podcasts.michaelbonner.dev/">podcasts.michaelbonner.dev</a
					>). Read blogs. Find developer subreddits. There is so much to learn. Find areas
					you&apos;re passionate about and learn as much as you can.
				</p>
				<p>Some good tutorial sites to learn web development things:</p>
				<ul>
					{#each ['https://www.theodinproject.com', 'https://www.freecodecamp.org/learn', 'https://wesbos.com/courses', 'https://leveluptutorials.com'] as link}
						<li>
							<a href={link}>
								{link.replace(/https:\/\/([\w]{3}[.])?/g, '')}
							</a>
						</li>
					{/each}
				</ul>
				<p>Some good subreddits to learn web development things:</p>
				<ul class="flex flex-wrap gap-x-4 gap-y-2 list-none">
					{#each ['r/css', 'r/javascript', 'r/sveltejs', 'r/nextjs', 'r/node', 'r/reactjs', 'r/SyntaxFM', 'r/webdev'] as subreddit}
						<li class="p-0">
							<a href={`https://www.reddit.com/${subreddit}`}>
								{subreddit}
							</a>
						</li>
					{/each}
				</ul>
				<p>Some good sites to learn web development things:</p>
				<ul>
					{#each ['https://css-tricks.com', 'https://blog.hubspot.com/website/website-development', 'https://dev.to', 'https://davidwalsh.name'] as site}
						<li>
							<a class={classes.bodyLink} href={site}>
								{site.replace(/https:\/\/([w]{3}[.])?/g, '')}
							</a>
						</li>
					{/each}
				</ul>
				<p>
					Learn out loud. Writing and/or streaming about what you learn is a great way to learn
					faster. My friend Steven has done a great job advancing his knowledge and network
					specifically by posting what he learns. Check out his stuff (<a
						class={classes.bodyLink}
						href="https://medium.com/@steven_creates"
					>
						medium.com/@steven_creates</a
					>).
				</p>
				<h2>Get your first job as a web developer</h2>
				<p>
					Look at job sites and find what skills companies are looking for, and then learn the
					skills for the job you want. A lot of technologies in web development are open source and
					free to use. Learning them won&apos;t happen overnight, but over time you&apos;ll become a
					better developer. Exposure to new languages and frameworks will help you teach your brain
					to learn quickly. Be okay with being stuck on something. Go for a walk and come back to
					it. That frustration is part of the learning process, there&apos;s no way around it.
				</p>
				<p>
					<strong>Be honest in interviews</strong>. If you don&apos;t know something, it&apos;s
					completely fine to say &ldquo;I don&apos;t know&rdquo; and ask questions about it. Lying
					about it is never the right answer. Trust me. People who have interviewed a handful of
					applicants can cut right through the BS and won&apos;t even entertain the idea of bringing
					on a developer that doesn&apos;t acknowledge the shortcomings they have.
				</p>
				<p>
					<strong>Be hungry</strong>. Good team members bring a growth mindset and are willing to
					learn as much as they can from whomever they can. Be that person; especially in
					interviews. Take notes during interviews about the things you didn&apos;t know. Interviews
					are a great way to learn the things you don&apos;t know that you don&apos;t know.
				</p>
				<h2>Need more info</h2>
				<p>
					Hit me up on LinkedIn. I&apos;m happy to chat with you about your career path and give you
					some advice.
				</p>
				<p>
					<a class={classes.bodyLink} href="https://www.linkedin.com/in/michaelbonner/">
						linkedin.com/in/michaelbonner/
					</a>
				</p>

				<p class="mt-16">
					Published:{` `}
					<time dateTime="2022-03-08">08 Mar 2022</time>
				</p>
				<p>
					Updated:{` `}
					<time dateTime="2022-12-18">18 Dec 2022</time>
				</p>
			</div>
		</div>
	</div>
</main>
