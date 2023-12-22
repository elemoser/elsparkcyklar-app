<script>
	import { goto } from '$app/navigation';
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	import { updateUser } from '$lib/stores/user.js';
	export let data;

	const { active } = data;

	async function stopRide() {
		const endResponse = await fetch(`http://localhost:1338/v1/booking/id/${active.id}`, {
			method: 'PUT',
			credentials: 'include'
		});

		if (endResponse.status === 200) {
			updateUser({ active: false });
			goto('/profile/invoice');
		}
	}

	const coords = active.start_location.split(', ');
	const mapData = {
		markers: {
			0: {
				text: `Bike ${active.bike_id}`,
				coordinates: [coords[0], coords[1]]
			}
		}
	};
</script>

<div class="tour-container">
	<h1>Bike {active.bike_id}</h1>
	<div class="map-container">
		<LeafletMap data={mapData} />
	</div>
	<button class="button stop" on:click={stopRide}>Stop</button>
</div>

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

	button {
		font-size: 1.5em;
		border: 1px solid $con-border-col;
	}

	.stop {
		&:hover {
			background-color: #f37474;
			border: 1px solid darken(#f37474, 20%);
		}
	}
</style>
