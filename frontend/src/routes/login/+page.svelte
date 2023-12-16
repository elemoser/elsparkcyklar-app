<script>
	import { app_name } from '$lib/index.js';
	export let form;

	//TODO Remove "ID" has to exist because ID is forced in order to create user.
	//TODO Change login to not be ID.
</script>

<div class="login-wrapper">
	<div class="form-div">
		<h1>{app_name}</h1>

		<p>Login with:</p>
		<a class="button" href="http://localhost:1338/login">Github<i class="fab fa-github"></i></a>
	</div>
</div>

<style lang="scss">
	h1 {
		/*color: $contrast-color;*/ //Alternativ design med mörk bakgrund
		text-align: center;
		font-weight: 700;
		font-size: 4em;
	}

	p {
		text-align: center;
		margin-bottom: calc($calculated-line-height / 4);
	}

	.button {
		display: block;
		text-align: center;
		color: #fafafa;
		background-color: $text-color;

		&:hover {
			background-color: $contrast-color;
			color: $text-color;
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
</style>
