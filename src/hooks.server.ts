import { PUBLIC_POSTHOG_API_KEY } from '$env/static/public';
import type { HandleServerError } from '@sveltejs/kit';
import { PostHog } from 'posthog-node';

const client = new PostHog(PUBLIC_POSTHOG_API_KEY ?? '', {
	host: 'https://us.i.posthog.com'
});

export const handleError: HandleServerError = async ({ error, status }) => {
	if (status !== 404) {
		client.captureException(error);
		await client.shutdown();
	}

	return {
		message: 'An unexpected error occurred, we have been notified'
	};
};
