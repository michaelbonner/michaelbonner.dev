import { expect, type Page } from '@playwright/test';

/**
 * Waits until Svelte has hydrated the page. Server-rendered markup is visible
 * and focusable well before its listeners are attached, so typing or clicking
 * any earlier can be silently lost. The root layout sets the attribute.
 */
export const waitForHydration = (page: Page) =>
	expect(page.locator('html[data-hydrated]')).toBeAttached();
