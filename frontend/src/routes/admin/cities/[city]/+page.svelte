<script>
	// import { goto } from '$app/navigation';
	import LeafletMap from '$lib/components/LeafletMap.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	let mapData = {};

	if (data.props.data.bounds) {
		mapData['polygon'] = {
			text: data.props.data.name,
			coordinates: data.props.data.bounds
		};
	}
	//TODO Add reshistorik, invoices, whether or not has rented a bike atm
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<h2>Detaljer för Stad {data.props.target}</h2>
	<form class="submit-form" method="POST">
		<label for="id"
			>Id
			<input id="id" name="id" type="text" value={data.props.data.id} readonly />
		</label>
		<label for="name"
			>Namn
			<input id="name" name="name" type="text" value={data.props.data.name} readonly/>
		</label>
	</form>
	<button><a href="/admin/cities">Gå tillbaka</a></button>
	<LeafletMap data={mapData} />
{/if}

<style lang="scss">
	h2 {
		color: white;
	}
</style>
