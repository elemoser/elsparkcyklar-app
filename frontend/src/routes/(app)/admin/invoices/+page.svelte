<script>
	import Table from '$lib/components/Table.svelte';
	import {filterData} from '$lib/modules.js';

	export let data;
	let invoices = {};

	if (data.props.data.invoices) {
		invoices = formatTableData(data.props.data.invoices);

	}

	function formatTableData(inputData) {
		let dict = {};
		let body = {};
		let links = {};

		// Create table headers
		dict['header'] = Object.keys(inputData[0]);

		// Create table content
		for (const row in inputData) {
			body[row] = Object.values(inputData[row]);
			links[row] = [`/admin/users/${inputData[row].user_id}`, 'visa kund'];
		}
	
		dict['body'] = body;
		dict['links'] = links;

		return dict;
	}

	function filterInvoices(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const searchWord = formData.get('search_word').toLowerCase();

		if (searchWord) {
			resetData();
			let temp = invoices;
			invoices = filterData(temp, searchWord);
		}
	}

	function resetData() {
		invoices = formatTableData(data.props.data.invoices);
	}
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<div class="table-top-bar">
		<div>
			<form class="submit-form-online" on:submit={filterInvoices}>
				<input name="search_word" type="text" maxlength="20" />
				<input type="submit" value="Sök" />
			</form>
			<button class="btn-light" on:click={resetData}>Reset</button>
		</div>
		<!-- <a class="btn-link" href=""><button>+</button></a> -->
	</div>
	<Table data={invoices} />
{/if}