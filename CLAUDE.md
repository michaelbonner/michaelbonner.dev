# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager
This project uses **Bun** as the package manager. The preinstall hook enforces this with `npx only-allow bun`.

### Essential Commands
```bash
# Development
bun run dev              # Start dev server (opens at http://127.0.0.1:5173/)

# Building & Preview
bun run build            # Build for production
bun run preview          # Preview production build

# Testing
bun test                 # Run test setup + E2E tests
bun test:setup           # Update test data validation
bun test:e2e            # Run Playwright E2E tests only

# Code Quality
bun run check            # Type check with svelte-check
bun run check:watch      # Type check in watch mode
bun run lint             # Run prettier and eslint checks
bun run format           # Format code with prettier

# Dependencies
bun out                  # Check for outdated packages
bun up                   # Update dependencies
```

## Architecture Overview

### Framework & Deployment
- **SvelteKit 2.x** with Svelte 5 (uses Svelte 5 runes syntax: `$props`, `$derived`, `$state`)
- Deployed on **Vercel** using `@sveltejs/adapter-vercel`
- Uses **file-based routing** in `src/routes/`

### Key Architectural Patterns

#### Blog System Architecture
The blog uses a **static, file-based architecture** without a CMS:

1. **Blog metadata** is centralized in `src/lib/data/blogArticles.ts` as an array of article objects with:
   - `title`, `slug`, `teaser`, `publishedAt`, `readingTime`
   - `image` (imported using `?enhanced` query)
   - `tags` and `relatedSlugs` for navigation

2. **Blog content pages** live in `src/routes/blog/[slug]/+page.svelte` where each article:
   - Imports the article-specific image with `?enhanced` query
   - Uses `<Seo>` component for meta tags
   - Uses `<BlogPostSchema>` for structured data
   - Contains inline HTML/Svelte content (not markdown)

3. **Test data synchronization**: E2E tests use `e2e/validate-test-data.js` to ensure test data in `e2e/test-data/blog-articles.ts` stays in sync with actual blog routes. Run `bun test:setup` to validate/update.

#### Image Handling
Uses **@sveltejs/enhanced-img** with the `?enhanced` query parameter:
```svelte
import image from '$lib/images/example.jpg?enhanced';
// Use: {image.img.src} for src attribute
```

#### Analytics & Performance
- **PostHog** for analytics (both client and server)
  - Client-side: Initialized in `src/routes/+layout.svelte` with manual page view tracking
  - Server-side: Used in `src/hooks.server.ts` for error tracking
  - Configured via env vars: `PUBLIC_POSTHOG_API_KEY`, `PUBLIC_POSTHOG_ENABLED`
  - PostHog requests proxied through `/ingest` endpoint
- **Partytown** (`@qwik.dev/partytown`) offloads Google Analytics to web worker
- **Theme color animation**: Root layout animates theme color by decrementing hue in `onMount`

#### Styling
- **Tailwind CSS 4.x** with:
  - `@tailwindcss/typography` plugin
  - `@tailwindcss/postcss` and `@tailwindcss/vite` for build integration
  - Dark mode support (using `dark:` prefix)
- Shared styles in `src/styles/classes.ts` export reusable class strings
- Global styles in `src/app.css`
- Custom font: Newsreader variable font (`@fontsource-variable/newsreader`)

#### SEO & Structured Data
Strong emphasis on SEO with dedicated components:
- `src/components/Seo.svelte` - Meta tags and Open Graph
- `src/components/BlogPostSchema.svelte` - Article structured data
- `src/components/PersonSchema.svelte` - Person schema
- `src/components/OrganizationSchema.svelte` - Organization schema
- Root layout includes comprehensive Person schema with occupation, skills, and services
- Each blog post has canonical URLs and article publish dates

### Directory Structure
```
src/
├── routes/              # SvelteKit file-based routing
│   ├── +layout.svelte   # Root layout with analytics, theme animation
│   ├── +page.svelte     # Homepage
│   ├── blog/            # Blog articles (each in own directory)
│   ├── uses/            # Tech stack page
│   ├── patents/         # Patents page
│   └── policies/        # Policies page
├── components/          # Reusable Svelte components (SEO, schema, UI)
├── lib/
│   ├── data/            # Static data (blogArticles.ts)
│   ├── images/          # Image assets (imported with ?enhanced)
│   └── components/      # Shared lib components
├── functions/           # Utility functions (classNames.ts)
├── styles/              # Shared styles (classes.ts)
├── hooks.server.ts      # Server hooks (PostHog error tracking)
└── hooks.client.ts      # Client hooks
```

## Testing Strategy

### E2E Testing with Playwright
- Tests in `e2e/` directory
- **Test data validation** is critical: The `validate-test-data.js` script ensures test data matches actual blog routes by comparing slugs
- Playwright config builds and previews the app (port 4173) with a 5-minute timeout
- Tests use Levenshtein distance for string similarity checks on titles
- Always run `bun test:setup` before committing if blog articles change

## Adding a New Blog Post

1. Create directory: `src/routes/blog/[slug]/`
2. Add `+page.svelte` with:
   - Import image with `?enhanced`
   - Use `<Seo>` and `<BlogPostSchema>` components
   - Add canonical link and article meta tags
3. Add entry to `src/lib/data/blogArticles.ts`
4. Run `bun test:setup` to update test data
5. Run `bun test` to verify

## Environment Variables

Required for production:
- `PUBLIC_POSTHOG_API_KEY` - PostHog analytics key
- `PUBLIC_POSTHOG_ENABLED` - Toggle analytics (set to "false" to disable)

See `.env.example` for reference.

## Important Notes

- The codebase uses **Svelte 5 syntax** (`$props`, `$derived`, `$state`) not Svelte 4
- All images should use the `?enhanced` query parameter for optimization
- Blog articles are NOT markdown - they're Svelte components with inline content
- PostHog is initialized in the client but can be disabled via env var
- The project enforces strict TypeScript with all strict flags enabled
