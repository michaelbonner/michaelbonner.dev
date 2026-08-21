// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { D1Database } from '@cloudflare/workers-types';

declare global {
	namespace App {
		// interface Locals {}
		interface Platform {
			env?: {
				/**
				 * D1 binding declared in `wrangler.jsonc`. Optional because
				 * `vite dev` and `vite preview` run outside the Workers runtime,
				 * where there is no binding to reach.
				 */
				DB?: D1Database;
			};
		}
		// interface PrivateEnv {}
		// interface PublicEnv {}
		// interface Session {}
		// interface Stuff {}
	}
}

export {};
