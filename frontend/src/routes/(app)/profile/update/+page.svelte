<script>
	import { goto } from '$app/navigation';
	import { updateUser } from '$lib/stores/user.js';
	export let data;
	const { user } = data;

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);

		const username = formData.get('username') === '' ? user.username : formData.get('username');

		const userObj = {
			username: username,
			role: user.role,
			balance: user.balance
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
			updateUser(userObj);
			goto('/profile');
		} else {
			console.log('Post a new username');
		}
	}
</script>

<div class="update-container">
	<h1>Update user</h1>
	<form on:submit={handleSubmit}>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" placeholder={user.username} />

		<label for="phone">Phone</label>
		<input id="phone" name="phone" type="tel" placeholder={user.phone} disabled />

		<label for="email">Mail</label>
		<input id="email" name="email" type="email" placeholder={user.mail} disabled />

		<input type="submit" value="Update" />
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

			&:last-child {
				align-self: flex-end;
				&:hover {
					background-color: darken(#f0f0f0, 5%); //temp color for effect.
				}
			}
		}
	}
</style>
