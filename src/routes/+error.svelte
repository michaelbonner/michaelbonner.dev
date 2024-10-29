<script>
	import { page } from '$app/stores';
</script>

<div class="container flex justify-between py-16 px-8 mx-auto">
	<div class="grid gap-4">
		<h1 class="text-3xl">{$page.error?.message}</h1>
		<p>
			Looks like you've hit a dead end. <a class="underline underline-offset-4" href="/"
				>Go back home</a
			>
		</p>
	</div>
</div>
