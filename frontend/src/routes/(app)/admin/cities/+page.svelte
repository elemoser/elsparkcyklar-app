<script>
	import Table from '$lib/components/Table.svelte';

	export let data;
	let cities = {};

	if (data && data.props.data.city) {
		let cityData = data.props.data.city;
		let body = {};
		let links = {};
		let content;

		// Create table headers
		content = Object.keys(cityData[0]);
		content.pop();
		cities['header'] = content;

		// Create table content
		for (const row in cityData) {
			content = Object.values(cityData[row]);
			content.pop();
			body[row] = content;
			links[row] = [`/admin/cities/${cityData[row].id}`, 'view'];
		}
		cities['body'] = body;
		cities['links'] = links;
	}
	//TODO search function
</script>

<!-- <form>
    <input type="text">
    <input type="submit" value='Sök'>
</form> -->

{#if cities}
	<Table data={cities} />
{/if}
