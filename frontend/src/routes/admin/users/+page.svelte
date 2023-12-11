<script>
	import Table from '$lib/components/Table.svelte';

	export let data;
	let users = {};

	if (data && data.props.data.users) {
		let userData = data.props.data.users;

		// Save headers
		users['header'] = Object.keys(userData[0]);
		// Save table content
		let body = {};
		let links = {};

		for (const row in userData) {
			body[row] = Object.values(userData[row]);
			links[row] = [`/admin/k${userData[row].id}`, 'view'];
		}
		users['body'] = body;
		users['links'] = links;
	}
</script>

<form>
	<input type="text" />
	<input type="submit" value="Sök" />
</form>

{#if users}
	<Table data={users} />
{/if}
