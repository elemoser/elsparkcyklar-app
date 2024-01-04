<script>
	import { goto } from '$app/navigation';
	import { updateUser } from '$lib/stores/user.js';
	export let data;
	const { user } = data;

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		let formBalance = Number(formData.get('balance'));

		//Add 0 if value is not numeric or less than 1.
		formBalance = isNaN(formBalance) || formBalance < 0 ? 0 : formBalance;

		let userBalance = user.balance;
		const userObj = {
			role: user.role,
			balance: userBalance + formBalance
		};

		const response = await fetch(`http://localhost:1338/v1/users/id/${user.id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userObj)
		});

		if (response.status === 200) {
			const updateBalance = { balance: parseFloat(userObj.balance).toFixed(2) };
			updateUser(updateBalance);

			goto('/profile');
		} else {
			console.log('Add credit failed.');
		}
	}
</script>

<div class="update-container">
	<h1>Payment</h1>
	<form on:submit={handleSubmit}>
		<input id="id" name="id" type="hidden" value={user.id} required />

		<label for="balance">Add Balance</label>
		<input
			id="balance"
			name="balance"
			type="number"
			placeholder={parseFloat(user.balance).toFixed(2)}
		/>

		<input type="submit" value="Add" />
		<a href="/profile">Back</a>
	</form>
</div>

<style lang="scss">
	.update-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	label {
		font-size: $base-font-size;
		font-family: $text-font;
		font-weight: 600;
	}

	input {
		display: block;
		font-size: $base-font-size;
		padding: 0.2em 0.3em;
		border-radius: 0.25em;
		border: 1px solid #333;

		&[type='submit']:hover {
			cursor: pointer;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		label {
			&::after {
				content: ':';
			}
		}

		input {
			margin-bottom: calc($calculated-line-height / 2);

			&:nth-last-child(2) {
				margin-bottom: $calculated-line-height;
			}

			&[type='submit'] {
				align-self: flex-end;
				&:hover {
					background-color: darken(#f0f0f0, 5%); //temp color for effect.
				}
			}
		}

		a {
			align-self: flex-start;
		}
	}
</style>
