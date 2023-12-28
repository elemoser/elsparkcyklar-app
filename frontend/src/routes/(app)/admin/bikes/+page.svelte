<script>
	import Table from '$lib/components/Table.svelte';
	import { filterData } from '$lib/modules.js';

	export let data;
	let bikes = {};

	if (data.props.data.bike) {
		bikes = formatTableData(data.props.data.bike);
	}

	function formatTableData(bikeData) {
		let dict = {};
		let body = {};
		let links = {};
		let content = [];
		let city_id;
		let name;

		// Create table headers
		content = Object.keys(bikeData[0]);
		content.splice(2, 1, 'city'); // replace city_id header
		dict['header'] = content;
	
		// Create table content
		for (const row in bikeData) {
			content = Object.values(bikeData[row]);
			// Replace city id with name
			if (data.props.data.city) {
				city_id = content.splice(2, 1);
				name = getCityName(data.props.data.city, city_id);
				content.splice(2, 0, name);
			}
			body[row] = content;
			links[row] = [`/admin/bikes/${bikeData[row].id}`, 'view'];
		}

		dict['body'] = body;
		dict['links'] = links;

		return dict;
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
	
	function filterBikes(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const searchWord = formData.get('search_word');

		if (searchWord) {
			resetData();
			let temp = bikes;
			bikes = filterData(temp, searchWord);
		}
	}

	function resetData() {
		bikes = formatTableData(data.props.data.bike);
	}
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<div class="table-top-bar">
		<div>
			<form class="submit-form-online" on:submit={filterBikes}>
				<input name="search_word" type="text" maxlength="20" />
				<input type="submit" value="Sök" />
			</form>
			<button class="btn-light" on:click={resetData}>Reset</button>
		</div>
		<a class="btn-link" href="/admin/bikes/new"><button>+</button></a>
	</div>

	{#if Object.keys(bikes.body).length}
		<Table data={bikes} />
	{:else}
		<p>Inga resultat</p>
	{/if}
{/if}

<style lang="scss">
	p {
		color: white;
	}
</style>
