<script>
	import Table from '$lib/components/Table.svelte';
	import { filterData } from '$lib/modules.js';

	export let data;
	let parking = {};

	if (data && data.props.data.parking) {
		parking = formatTableData(data.props.data.parking);

	}

	function formatTableData(inputData) {
		let dict = {};
		let body = {};
		let links = {};
		let content;

		// Create table headers
		content = Object.keys(inputData[0]);
		dict['header'] = content;

		// Create table content
		for (const row in inputData) {
			content = Object.values(inputData[row]);
			body[row] = content;
			links[row] = [`/admin/parking/${inputData[row].id}`, 'view'];
		}

		dict['body'] = body;
		dict['links'] = links;

		return dict
	}
	
	function filterParking(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const searchWord = formData.get('search_word');

		if (searchWord) {
			resetData();
			let temp = parking;
			parking = filterData(temp, searchWord);
		}
	}

	function resetData() {
		parking = formatTableData(data.props.data.parking);
	}
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<div class="table-top-bar">
		<div>
			<form class="submit-form-online" on:submit={filterParking}>
				<input name="search_word" type="text" maxlength="20" />
				<input type="submit" value="Sök" />
			</form>
			<button class="btn-light" on:click={resetData}>Reset</button>
		</div>
		<!-- <a class="btn-link" href="/admin/bikes/new"><button>+</button></a> -->
	</div>
	{#if Object.keys(parking.body).length}
		<Table data={parking} />
	{:else}
		<p>Inga resultat</p>
	{/if}
{/if}

<style lang="scss">
	p {
		color: white;
	}
</style>
