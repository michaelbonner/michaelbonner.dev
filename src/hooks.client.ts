import type { HandleClientError } from '@sveltejs/kit/hooks';

// Imported lazily so posthog-js stays out of the startup bundle; see +layout.svelte.
// Only unexpected errors are reported; 404s and error() calls also reach this hook.
export const handleError: HandleClientError = ({ kind, error }) => {
	if (kind === 'unknown') {
		import('posthog-js').then(({ default: posthog }) => posthog.captureException(error));
	}
};
