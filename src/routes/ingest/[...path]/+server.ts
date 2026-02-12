import type { RequestHandler } from '@sveltejs/kit';

const POSTHOG_API_HOST = 'https://us.i.posthog.com';

const forwardRequest: RequestHandler = async ({ params, request, url, fetch }) => {
	const pathname = params.path ?? '';
	const targetUrl = `${POSTHOG_API_HOST}/${pathname}${url.search}`;

	const headers = new Headers(request.headers);
	headers.delete('host');

	return fetch(targetUrl, {
		method: request.method,
		headers,
		body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body
	});
};

export const GET = forwardRequest;
export const POST = forwardRequest;
export const PUT = forwardRequest;
export const PATCH = forwardRequest;
export const DELETE = forwardRequest;
export const OPTIONS = forwardRequest;
export const HEAD = forwardRequest;
