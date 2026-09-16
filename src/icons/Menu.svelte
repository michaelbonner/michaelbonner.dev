<script lang="ts">
	/*
		One icon for both states of the header's menu button. The two bars are
		translated and rotated into an X rather than swapped for a second icon, so
		the button never changes size mid-toggle and the transition is a composited
		transform.
	*/
	let { className = '', open = false } = $props();
</script>

<svg
	aria-hidden="true"
	class={className}
	fill="none"
	height="1em"
	role="presentation"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-width="1.75"
	viewBox="0 0 20 20"
	width="1em"
	xmlns="http://www.w3.org/2000/svg"
>
	<line
		class="origin-center transition-transform duration-200 ease-out"
		class:translate-y-[3px]={!open}
		class:rotate-45={open}
		x1="3"
		y1="10"
		x2="17"
		y2="10"
	/>
	<line
		class="origin-center transition-transform duration-200 ease-out"
		class:-translate-y-[3px]={!open}
		class:-rotate-45={open}
		x1="3"
		y1="10"
		x2="17"
		y2="10"
	/>
</svg>
