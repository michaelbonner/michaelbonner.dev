<script lang="ts">
	import Link from '../../icons/Link.svelte';
	import A from '../../components/A.svelte';
	import Seo from '../../components/Seo.svelte';
	import { classes } from '../../styles/classes';
	import { classNames } from '../../functions/classNames';

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

<div class="container mx-auto px-6 sm:px-8">
	<header class="grid max-w-[62ch] gap-5 py-16 lg:py-24">
		<p class={classes.eyebrow}>Patents</p>
		<h1 class="text-h1 text-ink font-serif font-semibold">Patents</h1>
		<p class="text-lead text-ink-muted font-serif">
			I&apos;m lucky enough to have my name listed on a few patents for work I did with <a
				class={classes.bodyLink}
				target="_blank"
				rel="noreferrer"
				href="https://www.blackthornsoftware.com">Blackthorn Software</a
			>. These patents are related to the construction project management platform
			<a class={classes.bodyLink} target="_blank" rel="noreferrer" href="https://www.crewview.com"
				>CrewView</a
			>, which I helped build. You can
			<a class={classes.bodyLink} href="/#projects">view more of my projects on the homepage</a>.
		</p>
	</header>

	{#if grantedPatents.length > 0}
		<section class="border-rule border-t pt-8 pb-8">
			<div class="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
				<h2 class={classes.sectionHeading}>Granted patents</h2>
				<p class={classes.label}>
					{grantedPatents.length}
					{grantedPatents.length === 1 ? 'patent' : 'patents'}
				</p>
			</div>

			<ul class="mt-8 grid gap-6 lg:mt-12">
				{#each grantedPatents as patent (patent.patentNumber)}
					<li class={classNames(classes.surface, 'grid gap-5 p-6 lg:p-8')}>
						<div class="grid gap-2">
							<p class={classNames(classes.label, 'text-accent tabular-nums')}>
								{patent.patentNumber}
							</p>
							<h3 class="text-h2 text-ink max-w-[45ch] font-serif font-semibold">{patent.title}</h3>
						</div>

						<p class="text-ink-muted max-w-[68ch] font-serif text-[1.0625rem] leading-relaxed">
							{patent.description}
						</p>

						<!--
							The filing details are a small record, so they sit in a definition
							list in the sans rather than as four bolded sentences of body copy.
						-->
						<dl
							class="border-rule grid gap-x-8 gap-y-3 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4"
						>
							<div class="grid gap-0.5">
								<dt class={classes.label}>Filed</dt>
								<dd class="text-ui text-ink font-sans">{patent.filingDate}</dd>
							</div>
							<div class="grid gap-0.5">
								<dt class={classes.label}>Issued</dt>
								<dd class="text-ui text-ink font-sans">{patent.issueDate}</dd>
							</div>
							<div class="grid gap-0.5">
								<dt class={classes.label}>Assignee</dt>
								<dd class="text-ui text-ink font-sans">{patent.assignee}</dd>
							</div>
							<div class="grid gap-0.5">
								<dt class={classes.label}>Inventors</dt>
								<dd class="text-ui text-ink font-sans">{patent.inventors.join(', ')}</dd>
							</div>
						</dl>

						<div>
							<A href={patent.googlePatentUrl} className="font-sans text-ui">
								<Link className="size-4" />
								<span>View on Google Patents</span>
							</A>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
