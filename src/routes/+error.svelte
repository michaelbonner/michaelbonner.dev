<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<div class="mx-auto flex max-w-[90rem] justify-between px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
	<div class="prose grid gap-4">
		<h1>{page.error?.message}</h1>
		<p>
			Looks like you've hit a dead end. <a class="underline underline-offset-4" href={resolve('/')}
				>Go back home</a
			>
		</p>
	</div>
</div>
