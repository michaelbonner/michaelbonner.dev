<script lang="ts">
	import Link from '../../icons/Link.svelte';
	import A from '../../components/A.svelte';
	import Seo from '../../components/Seo.svelte';

	type Patent = {
		title: string;
		patentNumber?: string;
		publicationNumber?: string;
		inventors: string[];
		filingDate: string;
		issueDate?: string;
		publicationDate?: string;
		assignee: string;
		description: string;
		googlePatentUrl: string;
		status: 'granted' | 'application';
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
			googlePatentUrl: 'https://patents.google.com/patent/US12488299B2',
			status: 'granted'
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
			googlePatentUrl: 'https://patents.google.com/patent/US12530642B2',
			status: 'granted'
		}
	];

	const patentApplications: Patent[] = [
		{
			title:
				'Ingesting data from independent sources and partitioning data across database systems',
			publicationNumber: 'US 2023/0229999 A1',
			inventors: ['Russell E. Fowles', 'Chase Kitteridge', 'Michael Bonner'],
			filingDate: 'December 16, 2022',
			publicationDate: 'July 20, 2023',
			assignee: 'Blackthorn IP LLC',
			description:
				'Technology for managing data aggregation from multiple independent sources and organizing it across distributed database systems. The system enables securely and efficiently ingesting files and datapoints from different sources and uses machine learning to identify common classifications and match data to appropriate project buckets.',
			googlePatentUrl: 'https://patents.google.com/patent/US20230229999A1',
			status: 'application'
		},
		{
			title: 'Systems and methods for linking data entries in database systems',
			publicationNumber: 'US 2023/0230000 A1',
			inventors: ['Russell E. Fowles', 'Chase Kitteridge', 'Michael Bonner'],
			filingDate: 'December 16, 2022',
			publicationDate: 'July 20, 2023',
			assignee: 'Blackthorn IP LLC',
			description:
				'Data management system designed to ingest, store, and analyze data from multiple independent sources. The platform specializes in construction project management, organizing information about personnel, equipment, budgets, and contracts into organized database partitions.',
			googlePatentUrl: 'https://patents.google.com/patent/US20230230000A1',
			status: 'application'
		},
		{
			title: 'Data packet queue in network computing systems',
			publicationNumber: 'US 2023/0246979 A1',
			inventors: ['Russell E. Fowles', 'Chase Kitteridge', 'Michael Bonner'],
			filingDate: 'December 16, 2022',
			publicationDate: 'August 3, 2023',
			assignee: 'Blackthorn IP LLC',
			description:
				'Systems for managing data ingestion and storage across multiple independent sources using database partitioning and queuing techniques. Key functionality includes data packet optimization that reduces transmission sizes, particularly for offline or low-bandwidth scenarios.',
			googlePatentUrl: 'https://patents.google.com/patent/US20230246979A1',
			status: 'application'
		}
	];
</script>

<Seo
	title="Patents by Michael Bonner - Inventor & Software Developer"
	description="A collection of patents and patent applications listing Michael Bonner as inventor, covering data management systems and construction project management technology."
/>

<svelte:head>
	<link rel="canonical" href="https://michaelbonner.dev/patents" />
</svelte:head>

<div class="container mx-auto grid gap-8 px-8 py-12">
	<div class="prose dark:prose-invert max-w-3xl">
		<h1>Patents</h1>
		<p class="max-w-xl text-lg">
			I'm lucky enough to have my name listed on a few patents and patent applications for work I
			did with <A href="https://www.blackthornsoftware.com">Blackthorn Software</A>. Here is a list
			of them.
		</p>
		<p class="max-w-xl text-lg">
			These patents are related to the construction project management platform
			<A href="https://www.crewview.com">CrewView</A>, which I helped build. You can
			<A href="/#projects">view more of my projects on the homepage</A>.
		</p>
	</div>

	<div class="mt-12 grid gap-24">
		{#if grantedPatents.length > 0}
			<div
				class="grid border-l border-gray-300 pl-4 md:grid-cols-3 md:pl-8 xl:grid-cols-6 dark:border-gray-600"
			>
				<div class="text-xl">Granted Patents</div>
				<div class="grid gap-8 md:col-span-2 xl:col-span-5">
					{#each grantedPatents as patent (patent.patentNumber)}
						<div>
							<h2 class="mb-2 text-2xl font-bold">{patent.title}</h2>
							<div class="mb-2 text-base text-gray-600 dark:text-gray-400">
								Patent Number: {patent.patentNumber}
							</div>
							<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
								<strong>Inventors:</strong>
								{patent.inventors.join(', ')}
							</div>
							<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
								<strong>Filed:</strong>
								{patent.filingDate} | <strong>Issued:</strong>
								{patent.issueDate}
							</div>
							<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
								<strong>Assignee:</strong>
								{patent.assignee}
							</div>
							<p class="max-w-xl text-lg text-gray-700 dark:text-gray-400">
								{patent.description}
							</p>
							<div class="mt-2">
								<A href={patent.googlePatentUrl} className="text-base">
									<Link />
									<span>View on Google Patents</span>
								</A>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if patentApplications.length > 0}
			<div
				class="grid border-l border-gray-300 pl-4 md:grid-cols-3 md:pl-8 xl:grid-cols-6 dark:border-gray-600"
			>
				<div class="text-xl">Patent Applications</div>
				<div class="grid gap-8 md:col-span-2 xl:col-span-5">
					{#each patentApplications as patent (patent.publicationNumber)}
						<div>
							<h2 class="mb-2 text-2xl font-bold">{patent.title}</h2>
							<div class="mb-2 text-base text-gray-600 dark:text-gray-400">
								Publication Number: {patent.publicationNumber}
							</div>
							<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
								<strong>Inventors:</strong>
								{patent.inventors.join(', ')}
							</div>
							<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
								<strong>Filed:</strong>
								{patent.filingDate} | <strong>Published:</strong>
								{patent.publicationDate}
							</div>
							<div class="mb-2 text-sm text-gray-600 dark:text-gray-400">
								<strong>Assignee:</strong>
								{patent.assignee}
							</div>
							<p class="max-w-xl text-lg text-gray-700 dark:text-gray-400">
								{patent.description}
							</p>
							<div class="mt-2">
								<A href={patent.googlePatentUrl} className="text-base">
									<Link />
									<span>View on Google Patents</span>
								</A>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
