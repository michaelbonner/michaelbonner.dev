<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { classes } from '../styles/classes';
</script>

<div class="container mx-auto grid place-items-start px-6 py-24 sm:px-8 lg:py-32">
	<div class="grid max-w-[52ch] gap-5">
		<p class={classes.eyebrow}>
			Error {page.status}
		</p>
		<h1 class="text-h1 text-ink font-serif font-semibold">{page.error?.message}</h1>
		<p class="text-lead text-ink-muted font-serif">Looks like you&apos;ve hit a dead end.</p>
		<div class="mt-2 flex flex-wrap gap-3">
			<a class={classes.button} href={resolve('/')}>Go back home</a>
			<a class={classes.buttonQuiet} href={resolve('/blog')}>Read the blog</a>
		</div>
	</div>
</div>
