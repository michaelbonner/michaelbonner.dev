import { defineEnvVars } from '@sveltejs/kit/env';

// Every variable is optional: callers treat an empty string as "not configured"
// (analytics off, forms unavailable, site URL falls back to production).
export const variables = defineEnvVars({
	PUBLIC_POSTHOG_ENABLED: { public: true, schema: (input) => input ?? '' },
	PUBLIC_POSTHOG_API_KEY: { public: true, schema: (input) => input ?? '' },
	TURNSTILE_SECRET_KEY: { schema: (input) => input ?? '' },
	TELEGRAM_BOT_TOKEN: { schema: (input) => input ?? '' },
	TELEGRAM_CHAT_ID: { schema: (input) => input ?? '' },
	PUBLIC_TURNSTILE_SITE_KEY: { public: true, schema: (input) => input ?? '' },
	PUBLIC_SITE_URL: { public: true, schema: (input) => input ?? '' }
});
