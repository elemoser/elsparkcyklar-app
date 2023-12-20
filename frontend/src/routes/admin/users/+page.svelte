<script>
	import Table from '$lib/components/Table.svelte';
	//TODO update after oauth in place
	export let data;
	let users = {};
	let input = '';

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

	function filterData(inputData, filter) {
		// TODO Here I could transform the data so string to filter numbers as well
		for (let key in inputData.body) {
			if (!inputData.body[key].includes(filter)) {
				delete inputData.body[key];
				delete inputData.links[key];
			}
		}

		return inputData;
	}

	function filterUsers(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const searchWord = formData.get('search_word').toLowerCase();
		// TODO create more elaborate search criteria
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

<form on:submit={filterUsers}>
	<input name="search_word" type="text" maxlength="20" />
	<input type="submit" value="Sök" />
</form>
<button on:click={resetData}>Reset</button>

{#if users}
	<button><a href="/admin/users/new">+</a></button>
	{#if Object.keys(users.body).length}
		<Table data={users} />
	{:else}
		<p>Inga resultat</p>
	{/if}
{/if}
