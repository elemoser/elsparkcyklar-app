<script>
	// import { goto } from '$app/navigation';
	import LeafletMap from '$lib/components/LeafletMap.svelte';
	import Table from '$lib/components/Table.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let parking = {};
	let changersTable = {};
	let mapData = {};
	let showChargers = false;
	let showMap = false;

	if (data.props.data.parking) {
		parking = data.props.data.parking;
		mapData['markers'] = {
			0: {
				text: parking.name,
				coordinates: parking.center.split(', '),
				radius: parking.radius
			}
		};
	}

	if (data.props.data.chargers) {
		let body = {};

		for (let key in data.props.data.chargers) {
			if (data.props.data.chargers[key].parking_id === parking.id) {
				body[key] = Object.values(data.props.data.chargers[key]);
			}
		}
		changersTable['header'] = Object.keys(data.props.data.chargers[0]);
		changersTable['body'] = body;
		changersTable['links'] = {};
	}

	function toggleTable() {
		showChargers = !showChargers;
	}

	function toggleMap() {
		showMap = !showMap;
	}
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<div class="table-top-bar">
		<h2>Detaljer för parkering {data.props.target}</h2>
		<a class="btn-link" href="/admin/parking"><button>x</button></a>
	</div>
	<form class="submit-form">
		<label for="id"
			>Parkering id
			<input id="id" name="id" type="number" value={parking.id} readonly />
		</label>
		<label for="name"
			>Namn
			<input id="name" name="name" type="text" value={parking.name} readonly />
		</label>
		<label for="city_id"
			>Stad id
			<input id="city_id" name="city_id" type="number" value={parking.city_id} readonly />
		</label>
		<label for="number_of_chargers"
			>Antal laddare
			<input
				id="number_of_chargers"
				name="number_of_chargers"
				type="number"
				value={parking.number_of_chargers}
				readonly
			/>
		</label>
	</form>

	<div>
		<label>
			<input type="checkbox" on:click={toggleMap} />
			visa på kartan
		</label>
		<label>
			<input type="checkbox" on:click={toggleTable} />
			visa alla laddare
		</label>
	</div>

	{#if showChargers}
		<h3>Laddstationer</h3>
		<Table data={changersTable} />
	{/if}

	{#if showMap}
		<LeafletMap data={mapData} />
	{/if}
{/if}

<style lang="scss">
	h2,
	h3 {
		color: white;
	}
</style>
