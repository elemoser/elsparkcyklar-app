<script>
	// import { goto } from '$app/navigation';
	// import LeafletMap from '$lib/components/LeafletMap.svelte';
	import Table from '$lib/components/Table.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	console.log(data);
	let parking = {}
	let changersTable = {};
	if (data.props.data.parking) {
		parking = data.props.data.parking;
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
		console.log(changersTable);
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
			<input id="id" name="id" type="text" value={parking.id} readonly />
		</label>
	</form>
	<h2>Laddstationer</h2>
	<Table data={changersTable} />
{/if}

<style lang="scss">
	h2 {
		color: white;
	}
</style>