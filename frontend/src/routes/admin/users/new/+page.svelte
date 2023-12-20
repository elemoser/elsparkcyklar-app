<script>
	import { goto } from '$app/navigation';
    let roleOptions = ['customer','admin'];

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

<h2>Skapa en ny användare</h2>
<form on:submit={createUser}>
    <label for="id"
        >Kund id
        <input id="id" name="id" type="number" max="9999999999" required/>
        *max=10
    </label>
    <label for="username"
        >Användarnamn
        <input
            id="username"
            name="username"
            type="text"
            maxlength="20"
            required
        />
        *max=20
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
        <input
            id="balance"
            name="balance"
            type="number"
            value=0
            min="0"
            max="10000"
            step="0.01"
        />
	<input type="submit" value="Spara" />
</form>

<button><a href="/admin/users">Avbryt</a></button>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		input,
		select {
			width: fit-content;
			margin-left: 0.2rem;
			padding: 0.2rem 0.4rem;
			border-radius: 5px;
		}

		option:disabled,
		input:read-only:not([type='submit']) {
			color: $dark-color;
			border: none;
		}

		input:focus,
		select:focus {
			outline: none;
		}
	}
</style>
