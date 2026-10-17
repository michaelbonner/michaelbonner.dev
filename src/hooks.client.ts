import type { HandleClientError } from '@sveltejs/kit';

// Imported lazily so posthog-js stays out of the startup bundle; see +layout.svelte.
export const handleError: HandleClientError = ({ error, status }) => {
	if (status !== 404) {
		import('posthog-js').then(({ default: posthog }) => posthog.captureException(error));
	}
};
