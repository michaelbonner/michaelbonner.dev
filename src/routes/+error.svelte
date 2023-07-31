<script>
	import { page } from '$app/stores';
</script>

<div class="flex justify-between px-8 container mx-auto py-16">
	<div class="grid gap-4">
		<h1 class="text-3xl">{$page.error?.message}</h1>
		<p>
			Looks like you've hit a dead end. <a class="underline underline-offset-4" href="/"
				>Go back home</a
			>
		</p>
	</div>
</div>
