<script>
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	export let data;

	const { active } = data;
</script>

<div class="tour-container">
	<h1>Bike {active.bike_id}</h1>
	<!-- TODO Add user coords -->
	<div class="map-container">
		<LeafletMap />
	</div>
	<form method="POST">
		<button class="button stop" formaction="?/stop">Stop</button>
	</form>
</div>

<!-- TODO Pause button? -->

<style lang="scss">
	.tour-container {
		max-width: 65rem;
		margin: 0 auto;
		text-align: center;
	}

	.map-container {
		max-width: 50rem;
		margin: 0 auto $calculated-line-height auto;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: $calculated-line-height;

		button {
			font-size: 1.5em;
			border: 1px solid $con-border-col;
		}
	}

	.stop {
		&:hover {
			background-color: #f37474;
			border: 1px solid darken(#f37474, 20%);
		}
	}
</style>
