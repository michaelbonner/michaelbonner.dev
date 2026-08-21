<script lang="ts">
	import { enhance } from '$app/forms';
	import { env } from '$env/dynamic/public';
	import { Turnstile } from 'svelte-turnstile';
	import { classNames } from '../functions/classNames';
	import { classes } from '../styles/classes';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	let dialog: HTMLDialogElement | undefined = $state();
	let nameField: HTMLInputElement | undefined = $state();
	let alertElement: HTMLParagraphElement | undefined = $state();

	let submitting = $state(false);
	let succeeded = $state(false);
	let error = $state('');

	/*
	 * Turnstile hands out one token per challenge, and a rejected submission has
	 * already spent it. Bumping this remounts the widget so a retry carries a
	 * fresh token instead of a used one the server will refuse again.
	 */
	let captchaAttempt = $state(0);

	/*
	 * `showModal()` rather than the `open` attribute: it puts the dialog in the
	 * top layer (so it clears the sticky header and the map's own stacking
	 * context), makes the rest of the page inert, and gives us Esc-to-close and
	 * focus containment for free.
	 */
	$effect(() => {
		if (!dialog) return;

		if (open && !dialog.open) {
			dialog.showModal();
			// The browser focuses the first focusable node, which is the close
			// button. The name field is where the visitor actually starts.
			nameField?.focus();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	});

	/*
	 * The form is taller than the dialog on a short screen, and the submit button
	 * is at the bottom of it, so an error added at the top would otherwise land
	 * out of sight.
	 */
	$effect(() => {
		if (error) alertElement?.scrollIntoView({ block: 'nearest' });
	});

	const close = () => {
		open = false;
	};
</script>

<!--
	The dialog only closes through its own `close` event, so Esc, the close
	button, and a backdrop click all land in one place.
-->
<dialog
	bind:this={dialog}
	onclose={() => {
		// Every close route ends here, so the reset lives here too: a reopen is a
		// fresh suggestion rather than the last one's outcome. The content is
		// already unmounted by then, so nothing flashes.
		open = false;
		succeeded = false;
		error = '';
	}}
	onclick={(event) => {
		// Only the backdrop is the dialog element itself; everything else is
		// inside the padded wrapper below.
		if (event.target === dialog) close();
	}}
	aria-labelledby="suggest-restaurant-heading"
	class={classNames(
		'text-ink m-auto max-h-[min(85dvh,44rem)] w-[min(34rem,calc(100vw-2rem))] p-0',
		'border-rule bg-surface shadow-lift overflow-y-auto rounded-xl border'
	)}
>
	{#if open}
		<div class="grid gap-5 p-5 sm:p-7">
			<div class="flex items-start justify-between gap-4">
				<div class="grid gap-2">
					<p class={classes.eyebrow}>Suggest a restaurant</p>
					<h2 id="suggest-restaurant-heading" class="text-h3 text-ink font-serif font-semibold">
						Where should I eat next?
					</h2>
				</div>
				<button
					type="button"
					onclick={close}
					aria-label="Close"
					class={classNames(
						classes.label,
						'hover:text-accent -mt-1 -mr-1 cursor-pointer p-2 text-xl leading-none'
					)}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>

			{#if succeeded}
				<div class="border-rule grid gap-4 border-t pt-5">
					<p class="text-ink-muted font-serif text-[1.0625rem]">
						Thanks &mdash; that&rsquo;s in my list to try. If it lives up to the write-up,
						it&rsquo;ll show up on this page.
					</p>
					<button type="button" onclick={close} class={classes.button}>Done</button>
				</div>
			{:else}
				<form
					method="POST"
					action="?/suggest"
					use:enhance={() => {
						submitting = true;
						error = '';

						/*
						 * The result is handled here instead of through the default
						 * `update()` so the outcome stays inside the dialog: the page's
						 * filters and its URL are untouched by a suggestion.
						 */
						return async ({ result }) => {
							submitting = false;

							if (result.type === 'success') {
								succeeded = true;
								return;
							}

							captchaAttempt += 1;

							error =
								(result.type === 'failure' && typeof result.data?.error === 'string'
									? result.data.error
									: '') || 'Something went wrong sending that. Please try again.';
						};
					}}
					class="border-rule grid gap-5 border-t pt-5"
				>
					<p class="text-ink-muted font-serif text-[1.0625rem]">
						Tell me about a place you love. The name and the why are all I need; the rest helps me
						find it.
					</p>

					{#if error}
						<!--
							Announced rather than only coloured, and carrying its own words, so
							it does not depend on colour alone. Matches the contact form.
						-->
						<p
							bind:this={alertElement}
							role="alert"
							class="border-accent-bright bg-accent-soft text-ui text-ink rounded-lg border px-4 py-3 font-sans"
						>
							{error}
						</p>
					{/if}

					<div class="grid gap-1.5">
						<label for="suggest-restaurant-name" class={classes.label}>
							Restaurant <span aria-hidden="true" class="text-accent">*</span>
						</label>
						<input
							bind:this={nameField}
							type="text"
							id="suggest-restaurant-name"
							name="restaurantName"
							maxlength="120"
							required
							class={classes.input}
						/>
					</div>

					<div class="grid gap-5 sm:grid-cols-2">
						<div class="grid gap-1.5">
							<label for="suggest-restaurant-location" class={classes.label}>Location</label>
							<input
								type="text"
								id="suggest-restaurant-location"
								name="location"
								maxlength="120"
								placeholder="Neighborhood or city"
								class={classes.input}
							/>
						</div>

						<div class="grid gap-1.5">
							<label for="suggest-restaurant-tags" class={classes.label}>Food</label>
							<input
								type="text"
								id="suggest-restaurant-tags"
								name="tags"
								maxlength="120"
								placeholder="Thai, pizza, coffee&hellip;"
								class={classes.input}
							/>
						</div>
					</div>

					<div class="grid gap-1.5">
						<label for="suggest-restaurant-notes" class={classes.label}>
							Why it belongs on the list <span aria-hidden="true" class="text-accent">*</span>
						</label>
						<textarea
							id="suggest-restaurant-notes"
							name="notes"
							rows="4"
							maxlength="1500"
							required
							placeholder="What should I order?"
							class={classNames(classes.input, 'resize-y')}></textarea>
					</div>

					<div class="border-rule grid gap-5 border-t pt-5 sm:grid-cols-2">
						<div class="grid gap-1.5">
							<label for="suggest-restaurant-submitted-by" class={classes.label}>Your name</label>
							<input
								type="text"
								id="suggest-restaurant-submitted-by"
								name="submittedBy"
								maxlength="120"
								class={classes.input}
							/>
						</div>

						<div class="grid gap-1.5">
							<label for="suggest-restaurant-email" class={classes.label}>Your email</label>
							<input
								type="email"
								id="suggest-restaurant-email"
								name="submittedByEmail"
								maxlength="254"
								aria-describedby="suggest-restaurant-email-hint"
								class={classes.input}
							/>
							<p id="suggest-restaurant-email-hint" class={classes.label}>
								Only if you want a reply.
							</p>
						</div>
					</div>

					{#if env.PUBLIC_TURNSTILE_SITE_KEY}
						{#key captchaAttempt}
							<div class="max-w-full min-w-0 overflow-x-auto">
								<Turnstile siteKey={env.PUBLIC_TURNSTILE_SITE_KEY} />
							</div>
						{/key}
					{/if}

					<div class="border-rule flex flex-wrap items-center gap-4 border-t pt-5">
						<button
							type="submit"
							disabled={submitting}
							class={classNames(classes.button, 'disabled:cursor-progress disabled:opacity-70')}
						>
							{submitting ? 'Sending…' : 'Send suggestion'}
						</button>
						<button type="button" onclick={close} class={classes.buttonQuiet}>Cancel</button>
					</div>
				</form>
			{/if}
		</div>
	{/if}
</dialog>

<style>
	dialog::backdrop {
		background-color: color-mix(in oklab, var(--ink) 45%, transparent);
	}

	/*
		A short rise on open so the dialog reads as arriving over the page rather
		than replacing it. The site-wide reduced-motion rule already collapses
		animation durations, so this needs no guard of its own.
	*/
	dialog[open] {
		animation: suggest-dialog-in 160ms ease-out;
	}

	@keyframes suggest-dialog-in {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}
	}

	dialog[open]::backdrop {
		animation: suggest-backdrop-in 160ms ease-out;
	}

	@keyframes suggest-backdrop-in {
		from {
			opacity: 0;
		}
	}
</style>
