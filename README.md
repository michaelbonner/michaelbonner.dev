<a href="https://michaelbonner.dev?utm_source=github"><img src="./static/og-image.jpg" alt="Repository for michaelbonner.dev" style="margin-bottom:20px;border-radius: 24px" /></a>

Public site for [michaelbonner.dev](https://michaelbonner.dev/).

## Getting Started

First, run the development server:

```bash
bun run dev -- --open
```

A browser should open at [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to see the result.

You can start editing the page by modifying `src/routes/index.svelte`. The page auto-updates as you edit the file.

## Restaurant suggestions

The "Suggest a restaurant" dialog on `/restaurants` posts to the `suggest` form
action in `src/routes/restaurants/+page.server.ts`, which stores the suggestion
in Cloudflare D1 and then sends a Telegram notification. It reuses the contact
form's `TURNSTILE_SECRET_KEY`, `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_CHAT_ID`; the
action refuses submissions rather than dropping them if any of those, or the D1
binding, are missing.

One-time setup:

```bash
# Create the database and paste the printed database_id into wrangler.jsonc
bunx wrangler d1 create michaelbonner-dev

# Apply the schema in migrations/
bunx wrangler d1 migrations apply michaelbonner-dev --local   # local dev
bunx wrangler d1 migrations apply michaelbonner-dev --remote  # production
```

To read what has come in:

```bash
bunx wrangler d1 execute michaelbonner-dev --remote \
  --command "SELECT * FROM restaurant_suggestions ORDER BY created_at DESC LIMIT 20"
```

The binding only exists inside the Workers runtime, so `bun run dev` and
`bun run preview` will report suggestions as unavailable. Use
`bunx wrangler dev` to exercise the whole path locally.
