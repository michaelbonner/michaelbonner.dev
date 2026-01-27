import { blogArticles } from '$lib/data/blogArticles';

export async function GET() {
	const baseUrl = 'https://michaelbonner.dev';

	// Static pages with their priorities and update frequencies
	const staticPages = [
		{ url: '', priority: '1.0', changefreq: 'daily' },
		{ url: '/blog', priority: '0.9', changefreq: 'daily' },
		{ url: '/uses', priority: '0.7', changefreq: 'monthly' },
		{ url: '/patents', priority: '0.7', changefreq: 'monthly' },
		{ url: '/policies', priority: '0.5', changefreq: 'yearly' },
		{ url: '/ellie', priority: '0.5', changefreq: 'yearly' }
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
		<priority>${page.priority}</priority>${page.lastmod ? `
		<lastmod>${page.lastmod}</lastmod>` : ''}
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
