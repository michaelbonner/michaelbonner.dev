import { PUBLIC_POSTHOG_API_KEY, PUBLIC_POSTHOG_ENABLED } from '$env/static/public';
import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error, status }) => {
	if (status !== 404 && PUBLIC_POSTHOG_ENABLED !== 'false' && PUBLIC_POSTHOG_API_KEY) {
		const normalizedError = error instanceof Error ? error : new Error(String(error));

		await fetch('https://us.i.posthog.com/capture/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				api_key: PUBLIC_POSTHOG_API_KEY,
				event: '$exception',
				distinct_id: 'server',
				properties: {
					$exception_message: normalizedError.message,
					$exception_type: normalizedError.name,
					status
				}
			})
		});
	}

	return {
		message: 'An unexpected error occurred, we have been notified'
	};
};
