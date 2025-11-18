<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<div class="container mx-auto flex justify-between px-8 py-16">
	<div class="grid gap-4">
		<h1 class="text-3xl">{page.error?.message}</h1>
		<p>
			Looks like you've hit a dead end. <a class="underline underline-offset-4" href={resolve('/')}
				>Go back home</a
			>
		</p>
	</div>
</div>
