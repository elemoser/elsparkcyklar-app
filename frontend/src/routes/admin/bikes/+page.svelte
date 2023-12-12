<script>
	import Table from '$lib/components/Table.svelte';

	export let data;
	let bikes = {};

	if (data && data.props.data.bike) {
		let bikeData = data.props.data.bike;
		let body = {};

		// Create table headers
		bikes['header'] = Object.keys(bikeData[0]);
		// Create table content
		for (const row in bikeData) {
			body[row] = Object.values(bikeData[row]);
		}
		bikes['body'] = body;
		bikes['links'] = {};
	}
</script>

<form>
	<input type="text" />
	<input type="submit" value="Sök" />
</form>

{#if bikes}
	<Table data={bikes} />
{/if}
