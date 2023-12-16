<script>
	import { goto } from '$app/navigation';
	export let data;
	const { user } = data;

	async function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const userId = formData.get('id');
		//TODO Fix update user in backend to allow user to update username.
		/*
		const userObj = {
			first_name: data.get('username'),
			phone: data.get('phone'),
			mail: data.get('email')
		};
		*/
		const response = await fetch(`http://server:1338/v1/users/id/${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userObj)
		});

		const res = await response.json();

		res.error ? console.log('Something went wrong.') : goto ('/profile'); //TODO Actually implement error handling?
	}
</script>

<div class="update-container">
	<h1>Update user</h1>
	<form on:submit={handleSubmit}>
		<input id="id" name="id" type="hidden" value={user.id} required />

		<label for="username">Username</label>
		<input id="username" name="username" type="text" placeholder={user.username} />

		<label for="phone">Phone</label>
		<input id="phone" name="phone" type="tel" placeholder={user.phone} />

		<label for="email">Mail</label>
		<input id="email" name="email" type="email" placeholder={user.mail} />

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
