import { blogArticles } from '$lib/data/blogArticles';

type SitemapPage = {
	url: string;
	priority: string;
	changefreq: string;
	lastmod?: string;
};

export async function GET() {
	const baseUrl = 'https://michaelbonner.dev';

	// Static pages with their priorities and update frequencies
	const staticPages: SitemapPage[] = [
		{ url: '', priority: '1.0', changefreq: 'daily', lastmod: '2026-01-26T21:37:35-07:00' },
		{ url: '/blog', priority: '0.9', changefreq: 'daily', lastmod: '2026-01-22T14:15:57-07:00' },
		{ url: '/uses', priority: '0.7', changefreq: 'monthly', lastmod: '2025-12-02T09:59:39-07:00' },
		{ url: '/patents', priority: '0.7', changefreq: 'monthly', lastmod: '2026-01-22T14:15:57-07:00' },
		{ url: '/policies', priority: '0.5', changefreq: 'yearly', lastmod: '2025-11-18T11:02:55-07:00' },
		{ url: '/ellie', priority: '0.5', changefreq: 'yearly', lastmod: '2025-11-18T11:02:55-07:00' }
	];

	// Blog posts with their actual publish dates
	const blogPosts = blogArticles.map((article) => ({
		url: `/blog/${article.slug}`,
		priority: '0.8',
		changefreq: 'monthly',
		lastmod: article.publishedAt.toISOString()
	}));

	// Combine all URLs
	const allPages = [...staticPages, ...blogPosts];

	// Generate XML sitemap
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `	<url>
		<loc>${baseUrl}${page.url}</loc>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>${
			page?.lastmod
				? `
		<lastmod>${page.lastmod}</lastmod>`
				: ''
		}
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
