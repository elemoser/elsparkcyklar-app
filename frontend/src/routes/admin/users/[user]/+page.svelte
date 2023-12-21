<script>
	// TODO remove?
	// import Form from '$lib/components/Form.svelte';
	import { goto } from '$app/navigation';
	/** @type {import('./$types').PageData} */
	export let data;
	let user = {};
	let edit = false;
	let check = false;
	let roleOptions = ['customer', 'admin'];

	if (data.props.data.user) {
		user = data.props.data.user;
	}

	async function updateUser(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const userId = formData.get('id');

		const data = {
			username: formData.get('username'),
			role: formData.get('role'),
			balance: formData.get('balance')
		};

		const encodedData = new URLSearchParams(data).toString();

		const response = await fetch(`http://localhost:1338/v1/users/id/${userId}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: encodedData
		});

		if (response.status === 200) {
			// redirect
			goto('/admin/users/');
		} else {
			console.log(`Failed to update bike ${userId}:`, response.statusText);
			//TODO error handling
		}
	}

	async function removeUser(id) {
		// Note that localhost instead of server needs to be used here
		const response = await fetch(`http://localhost:1338/v1/users/id/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		});

		if (response.status === 200) {
			// redirect
			goto('/admin/users');
		} else {
			console.log(`Failed to delete user ${id}:`, response.statusText);
			//TODO error handling
		}
	}
</script>

{#if data.props.data.error}
	<p>{data.props.data.error}</p>
{:else}
	<h2>Detaljer för kund {data.props.target}</h2>
	<form class="submit-form" on:submit={updateUser}>
		<label for="id"
			>Kund id
			<input id="id" name="id" type="number" value={user.id} readonly />
		</label>
		<label for="username"
			>Användarnamn
			<input
				id="username"
				name="username"
				type="text"
				value={user.username}
				readonly={!edit}
				maxlength="20"
			/>
		</label>
		<label for="role"
			>Rättigheter
			{#if !edit}
				<input id="role" name="role" type="text" value={user.role} readonly />
			{:else}
				<select id="role" name="role">
					{#each roleOptions as opt}
						{#if opt == user.role}
							<option value={opt} selected>{opt}</option>
						{:else}
							<option value={opt}>{opt}</option>
						{/if}
					{/each}
				</select>
			{/if}
		</label>
		<label for="balance"
			>Saldo
			<input
				id="balance"
				name="balance"
				type="number"
				value={user.balance}
				readonly={!edit}
				min="0"
				max="10000"
				step="0.01"
			/>
		</label>
		{#if edit}
			<input type="submit" value="Spara" />
		{/if}
	</form>
	{#if check}
		<p>Är du säker på att du vill ta bort denna användare från databasen?</p>
		<button on:click={removeUser(user.id)}>Radera</button>
		<button on:click={() => (check = false)}>Avbryt</button>
	{:else if edit}
		<button on:click={() => (edit = false)}>Avbryt</button>
	{:else}
		<button on:click={() => (check = true)}>Ta bort</button>
		<button on:click={() => (edit = true)}>Redigera</button>
		<button><a href="/admin/users">Avbryt</a></button>
	{/if}
{/if}

<style lang="scss">
	h2 {
		color: white;
	}
</style>
