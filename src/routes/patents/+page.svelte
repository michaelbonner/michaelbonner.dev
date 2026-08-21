<script lang="ts">
	import Link from '../../icons/Link.svelte';
	import A from '../../components/A.svelte';
	import Seo from '../../components/Seo.svelte';
	import { classes } from '../../styles/classes';

	type Patent = {
		title: string;
		patentNumber: string;
		inventors: string[];
		filingDate: string;
		issueDate: string;
		assignee: string;
		description: string;
		googlePatentUrl: string;
	};

	const grantedPatents: Patent[] = [
		{
			title: 'Data packet queue in network computing systems',
			patentNumber: 'US 12,488,299 B2',
			inventors: ['Russell E. Fowles', 'Chase Kitteridge', 'Michael Bonner'],
			filingDate: 'December 16, 2022',
			issueDate: 'December 2, 2025',
			assignee: 'Blackthorn IP LLC',
			description:
				'Systems and methods for data ingestion and storage with emphasis on ingesting data across multiple independent sources and partitioning and querying the ingested data. The technology addresses data aggregation platforms designed for construction project management, enabling organizations to manage tasks, personnel, equipment, budgets, and contracts from disparate data sources.',
			googlePatentUrl: 'https://patents.google.com/patent/US12488299B2'
		},
		{
			title: 'Linking data entries in database systems',
			patentNumber: 'US 12,530,642',
			inventors: ['Russell E. Fowles', 'Chase Kitteridge', 'Michael Bonner'],
			filingDate: 'December 16, 2022',
			issueDate: 'January 20, 2026',
			assignee: 'Blackthorn IP, LLC',
			description:
				'Systems, methods, and devices for data ingestion, database management, and data security. A method includes storing a plurality o f data entries i n a project bucket o n a database, wherein the plurality of data entries represents information applicable t o a plurality of data units associated with a project. The method includes organizing at least a portion of the plurality o f data units according to a polymorphous data schema. The method includes linking two or more data units of the plurality o f data units t o generate a project linkage. The method further includes restricting a user from removing only a portion of the project linkage from the project without first manually breaking the project linkage.',
			googlePatentUrl: 'https://patents.google.com/patent/US12530642B2'
		}
	];
</script>

<Seo
	title="Patents by Michael Bonner - Inventor & Software Developer"
	description="A collection of patents listing Michael Bonner as inventor, covering data management systems and construction project management technology."
	ogImage="/og/patents.jpg"
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/patents" />
</svelte:head>

<section class="py-16 sm:py-20 lg:py-28">
	<div class="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
		<p class="text-tomato font-sans text-base font-medium sm:text-sm">Inventor, apparently</p>
		<h1
			class="mt-3 max-w-[13ch] text-6xl font-medium tracking-tight text-balance sm:text-7xl lg:text-8xl"
		>
			Patents
		</h1>
		<p class="text-ink-muted mt-6 max-w-[65ch] font-sans text-xl text-pretty sm:text-lg/8">
			I'm lucky enough to have my name listed on a few patents for work I did with <a
				class={classes.bodyLink}
				target="_blank"
				rel="noreferrer"
				href="https://www.blackthornsoftware.com">Blackthorn Software</a
			>. These patents are related to the construction project management platform
			<a target="_blank" rel="noreferrer" href="https://www.crewview.com">CrewView</a>, which I
			helped build. You can
			<a class={classes.bodyLink} href="/#projects">view more of my projects on the homepage</a>.
		</p>

		<div class="border-ink/20 mt-14 grid gap-24 border-t pt-10 lg:mt-20">
			{#if grantedPatents.length > 0}
				<div class="grid gap-8 lg:grid-cols-[7fr_15fr] lg:gap-16">
					<h2 class="max-w-[12ch] text-4xl font-medium tracking-tight text-balance sm:text-5xl">
						Granted patents
					</h2>
					<ol class="divide-ink/15 border-ink/20 divide-y border-y" role="list">
						{#each grantedPatents as patent, index (patent.patentNumber)}
							<li class="py-8">
								<p class="text-tomato font-sans text-base font-medium tabular-nums sm:text-sm">
									0{index + 1} · {patent.patentNumber}
								</p>
								<h3
									class="mt-2 max-w-[28ch] text-3xl font-medium tracking-tight text-balance sm:text-4xl"
								>
									{patent.title}
								</h3>
								<dl class="text-ink-soft mt-5 grid gap-2 font-sans text-base sm:text-sm">
									<div>
										<dt class="text-ink inline font-semibold">Inventors:</dt>
										<dd class="inline">{patent.inventors.join(', ')}</dd>
									</div>
									<div>
										<dt class="text-ink inline font-semibold">Filed:</dt>
										<dd class="inline">{patent.filingDate}</dd>
									</div>
									<div>
										<dt class="text-ink inline font-semibold">Issued:</dt>
										<dd class="inline">{patent.issueDate}</dd>
									</div>
									<div>
										<dt class="text-ink inline font-semibold">Assignee:</dt>
										<dd class="inline">{patent.assignee}</dd>
									</div>
								</dl>
								<p class="text-ink-muted mt-5 max-w-[65ch] font-sans text-base/7 text-pretty">
									{patent.description}
								</p>
								<div class="mt-5">
									<A href={patent.googlePatentUrl} className="text-base">
										<Link />
										<span>View on Google Patents</span>
									</A>
								</div>
							</li>
						{/each}
					</ol>
				</div>
			{/if}
		</div>
	</div>
</section>
