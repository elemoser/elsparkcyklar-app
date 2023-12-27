<script>
	import Table from '$lib/components/Table.svelte';
	export let data;
	let bookings = {};
	if (data.props.data.bookings) {
		let bookingData = data.props.data.bookings;
		let body = {};
		let links = {};
		let content = [];
		let city_id;
		let name;
		// Create table headers
		content = Object.keys(bookingData[0]);
		// content.splice(2, 1, 'city'); // replace city_id header
		bookings['header'] = content;
		// Create table content
		for (const row in bookingData) {
			if (bookingData[row].stop_time === '') {
				bookingData[row].stop_time = 'ongoing';
			}
			content = Object.values(bookingData[row]);
			// Replace city id with name
			// if (data.props.data.city) {
			// 	city_id = content.splice(2, 1);
			// 	name = getCityName(data.props.data.city, city_id);
			// 	content.splice(2, 0, name);
			// }
			body[row] = content;
			links[row] = [`/admin/users/${bookingData[row].user_id}`, 'visa kund'];
		}
		bookings['body'] = body;
		bookings['links'] = links;
	}
	// Function to retrieve the city name
	function getCityName(object, id) {
		let name = '';
		for (let item in object) {
			if (object[item].id == id) {
				name = object[item].name;
			}
		}
		return name;
	}
	//TODO enable searching the table
</script>
{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<!-- <form method="POST">
        <input name="search_input" type="text">
        <input type="submit" value='Sök'>
    </form> -->
	<!-- <button><a href="/admin/bikes/new">+</a></button> -->
	<Table data={bookings} />
{/if}