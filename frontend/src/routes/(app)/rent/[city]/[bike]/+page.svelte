<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user.js';
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	import { onDestroy } from 'svelte';
	export let data;
	const { cityId } = data;
	const { bike } = data;
	let userData;

	const unsubscribe = user.subscribe(val => {
		userData = val;
	})

	const coords = bike.position.split(', ');
	const mapData = {
		markers: {
			0: {
				text: `Bike ${bike.id}`,
				coordinates: [
					coords[0],
					coords[1]
				]
			}
		}
	}

	async function rentBike() {

		const bookingObj = {
			bike_id: bike.id,
			user_id: userData.id
		};

		const response = await fetch(`http://localhost:1338/v1/booking`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bookingObj)
		});

		const res = await response.json();

		res.error ? console.log('something went wrong') : goto('/active');
	}

	onDestroy(() => {
		unsubscribe();
	});
</script>

<h2>Bike {bike.id}</h2>
<div class="map-container">
	<LeafletMap data={mapData} />
</div>
<p>Battery: {bike.battery}%</p>
<p>Status: {bike.state}</p>

<button class="button" type="submit" on:click={rentBike} value={bike.id}>Rent</button>

<a href="/rent/{cityId}">Tillbaka</a>

<style lang="scss">
	a {
		color: $text-color;
		&:hover {
			cursor: pointer;
			text-decoration: none;
		}
	}

	.button {
		display: block;
		border: 1px solid $con-border-col;
		margin-bottom: $calculated-line-height;
	}

	.map-container {
		max-width: 500px;
		margin-bottom: $calculated-line-height;
	}
</style>
