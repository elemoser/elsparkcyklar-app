<script>
	import Table from '$lib/components/Table.svelte';
	import { filterData } from '$lib/modules.js';

	//TODO update after oauth in place
	export let data;
	let users = {};

	if (data && data.props.data.users) {
		users = formatTableData(data.props.data.users);
	}

	function formatTableData(inputData) {
		let dict = {};
		let body = {};
		let links = {};

		// Save headers
		dict['header'] = Object.keys(inputData[0]);

		// Save table content
		for (const row in inputData) {
			body[row] = Object.values(inputData[row]);
			links[row] = [`/admin/users/${inputData[row].id}`, 'view'];
		}

		dict['body'] = body;
		dict['links'] = links;

		return dict;
	}

	function filterUsers(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const searchWord = formData.get('search_word').toLowerCase();

		if (searchWord) {
			resetData();
			let tempUsers = users;
			users = filterData(tempUsers, searchWord);
		}
	}

	function resetData() {
		users = formatTableData(data.props.data.users);
	}
</script>

{#if users}
	<div class="table-top-bar">
		<div>
		<form class="submit-form-online" on:submit={filterUsers}>
			<input name="search_word" type="text" maxlength="20" />
			<input type="submit" value="Sök" />
		</form>
		<button class="btn-light" on:click={resetData}>Reset</button>
		</div>
	<a class="btn-link" href="/admin/users/new"><button>+</button></a>
	</div>

	{#if Object.keys(users.body).length}
		<Table data={users} />
	{:else}
		<p>Inga resultat</p>
	{/if}
{/if}
