<script>
	import { goto } from '$app/navigation';
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	import { updateUser } from '$lib/stores/user.js';
	export let data;

	const { booking } = data.active;
	const { bike } = data.active;
	const { parkings } = data;

	async function stopRide() {
		const endResponse = await fetch(`http://localhost:1338/v1/booking/id/${booking.id}`, {
			method: 'PUT',
			credentials: 'include'
		});

		if (endResponse.status === 200) {
			updateUser({ active: false });
			goto('/profile/invoice');
		}
	}

	const coords = booking.start_location.split(', ');
	const mapData = {
		markers: {
			0: {
				text: `Bike ${bike.id} (${bike.battery}%) </br> ${bike.state}`,
				coordinates: [coords[0], coords[1]],
				state: bike.state
			}
		}
	};

	for (let key in parkings) {
		mapData.markers[key + 1] = {
			text: `${parkings[key].name} (${parkings[key].number_of_chargers} laddare)`,
			coordinates: parkings[key].center.split(', '),
			radius: parkings[key].radius
		};
	}
</script>

<div class="tour-container">
	<h1>Bike {booking.bike_id}</h1>
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
