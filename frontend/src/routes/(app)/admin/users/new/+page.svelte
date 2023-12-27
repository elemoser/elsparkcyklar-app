<script>
	import { goto } from '$app/navigation';
	let roleOptions = ['customer', 'admin'];
	async function createUser(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = {
			id: formData.get('id'),
			username: formData.get('username'),
			role: formData.get('role'),
			balance: formData.get('balance')
		};
		const encodedData = new URLSearchParams(data).toString();
		const response = await fetch('http://localhost:1338/v1/users', {
			method: 'POST',
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
			console.log(`Failed to update user ${id}:`, response.statusText);
			//TODO error handling
		}
	}
</script>

<div class="table-top-bar">
	<h2>Skapa en ny användare</h2>
	<a class="btn-link" href="/admin/users"><button>x</button></a>
</div>
<form class="submit-form" on:submit={createUser}>
	<label for="id"
		>Kund id
		<input id="id" name="id" type="number" max="9999999999" required />
		*Max antal tecken: 10
	</label>
	<label for="username"
		>Användarnamn
		<input id="username" name="username" type="text" maxlength="20" required />
		*Max antal tecken: 20
	</label>
	<label for="role"
		>Rättigheter
		<select id="role" name="role">
			{#each roleOptions as opt}
				<option value={opt}>{opt}</option>
			{/each}
		</select>
	</label>
	<label for="balance"
		>Saldo
		<input id="balance" name="balance" type="number" value="0" min="0" max="10000" step="0.01" />
	</label>
	<input type="submit" value="Spara" />
</form>

<style lang="scss">
	h2 {
		color: white;
	}
</style>
