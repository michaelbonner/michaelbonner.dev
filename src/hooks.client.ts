import type { HandleClientError } from '@sveltejs/kit';
import posthog from 'posthog-js';

export const handleError = ({ error, status }: HandleClientError) => {
	if (status !== 404) {
		posthog.captureException(error);
	}
};
