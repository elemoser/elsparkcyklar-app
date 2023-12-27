<script>
	import Table from '$lib/components/Table.svelte';
	export let data;
	let parking = {};
	if (data && data.props.data.parking) {
		let parkingData = data.props.data.parking;
		let body = {};
		let links = {};
		let content;
		// Create table headers
		content = Object.keys(parkingData[0]);
		parking['header'] = content;
		// Create table content
		for (const row in parkingData) {
			content = Object.values(parkingData[row]);
			body[row] = content;
			links[row] = [`/admin/parking/${parkingData[row].id}`, 'view'];
		}
		parking['body'] = body;
		parking['links'] = links;
	}
	//TODO search function
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<!-- <form method="POST">
        <input name="search_input" type="text">
        <input type="submit" value='Sök'>
    </form> -->
	<!-- <button><a href="/admin/bikes/new">+</a></button> -->
	<Table data={parking} />
{/if}