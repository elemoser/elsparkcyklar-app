<script>
	import Table from '$lib/components/Table.svelte';
	import { filterData } from '$lib/modules.js';

	export let data;
	let bookings = {};

	if (data.props.data.bookings) {
		bookings = formatTableData(data.props.data.bookings);
	}

	function formatTableData(inputData) {
		let dict = {};
		let body = {};
		let links = {};

		// Create table headers
		dict['header'] = Object.keys(inputData[0]);

		// Create table content
		for (const row in inputData) {
			if (inputData[row].stop_time === '') {
				inputData[row].stop_time = 'ongoing';
			}

			body[row] = Object.values(inputData[row]);
			body[row][7] = parseFloat(body[row][7]).toFixed(2); //Parse price to be formatted like: 10.00.
			links[row] = [`/admin/users/${inputData[row].user_id}`, 'visa kund'];
		}

		dict['body'] = body;
		dict['links'] = links;

		return dict;
	}

	function filterBookings(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const searchWord = formData.get('search_word').toLowerCase();

		if (searchWord) {
			resetData();
			let temp = bookings;
			bookings = filterData(temp, searchWord);
		}
	}

	function resetData() {
		bookings = formatTableData(data.props.data.bookings);
	}
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<div class="table-top-bar">
		<div>
			<form class="submit-form-online" on:submit={filterBookings}>
				<input name="search_word" type="text" maxlength="20" />
				<input type="submit" value="Sök" />
			</form>
			<button class="btn-light" on:click={resetData}>Reset</button>
		</div>
		<!-- <a class="btn-link" href=""><button>+</button></a> -->
	</div>
	<Table data={bookings} />
{/if}
