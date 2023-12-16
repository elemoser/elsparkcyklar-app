<script>
	import { goto } from '$app/navigation';
	export let data;
	const { cityId } = data;
	const { bike } = data;

	async function rentBike() {
		const userId = 117276057; //TODO FIX DYNAMIC USER ID.

		const bookingObj = {
			bike_id: bike.id,
			user_id: userId
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
</script>

<h2>Bike {bike.id}</h2>
<!-- TODO importera kartan och rita ut var cykeln befinner sig med hjälp av cykelns coords. -->
<p>Battery: {bike.battery}%</p>
<p>Status: {bike.state}</p>


<!-- TODO add action to rent bike. -->
<button class="button" type="submit" on:click={rentBike} value={bike.id}>Rent</button>

<!--
	is user subscriber? else pay upfront to rent
	to pay up front does the user have sufficient funds?
-->
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
</style>
