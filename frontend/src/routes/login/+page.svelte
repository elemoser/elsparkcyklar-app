<script>
	import { app_name } from '$lib/index.js';
	export let form;

	//TODO Remove "ID" has to exist because ID is forced in order to create user.
	//TODO Change login to not be ID.

	let register = false;
	let btnValue = 'Registrera';
	let textContent = 'Inte medlem? ';

	function toggleRegister() {
		register = !register;
		btnValue = register ? 'Logga in' : 'Registrera';
		textContent = register ? 'Redan medlem? ' : 'Inte medlem? ';
	}
</script>

<div class="login-wrapper">
	<div class="form-div">
		<h1>{app_name}</h1>

		{#if register}
			<form method="POST" action="?/register">
				<label for="id">SSN</label>
				<input id="id" name="id" type="number" required>

				<label for="fname">Förnamn</label>
				<input id="fname" name="fname" type="text" required />

				<label for="lname">Efternamn</label>
				<input id="lname" name="lname" type="text" required />

				<label for="phone">Telefonnummer</label>
				<input id="phone" name="phone" type="tel" required />

				<label for="email">E-post</label>
				<input id="email" name="email" type="email" required />

				<label for="pw">Lösenord</label>
				<input id="pw" name="pw" type="password" required />

				<input type="submit" value="Registrera"/>
			</form>
		{:else}
			<form method="POST" action="?/login">
				<label for="id">SSN</label>
				<input id="id" name="id" type="number" required />
				<!--
				<label for="email">E-post</label>
				<input id="email" name="email" type="email" required />
				<label for="pw">Lösenord</label>
				<input id="pw" name="pw" type="password" required />
				-->
				<input type="submit" value="Logga in"/>
			</form>
		{/if}
		<div class="text-div">
			<p>{textContent}</p>
			<label>
				<input type="button" value={btnValue} on:click={toggleRegister} />
			</label>
		</div>
		{#if form?.error}
			<div class="error">
				<h5>{form.error}</h5>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	h1 {
		/*color: $contrast-color;*/ //Alternativ design med mörk bakgrund
		text-align: center;
		font-weight: 700;
		font-size: 4em;
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

	.login-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		//background-color: $dark-color; Samma som med h1an (alternativt tema)
	}

	.text-div {
		display: flex;
		align-items: center;
		justify-content: center;

		p {
			margin-bottom: unset;
		}

		input {
			background-color: unset;
			border: unset;
			text-decoration: underline;
			&:hover {
				text-decoration: none;
			}
		}
	}

	.error {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.5em;
		margin: 0.5em;
		background-color: $contrast-color;
		border-radius: 0.25rem;
		border: 1px solid $con-border-col;

		h5 {
			margin-bottom: unset;
		}
	}
</style>
