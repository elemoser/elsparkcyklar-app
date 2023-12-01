<script>
	//TODO Get signed in user with their user id through the API.
	const user = {
		ssn: 123123123,
		name: 'Pelle',
		surname: 'Skrutt',
		phone: '07012312340',
		mail: 'Pelle.skrutt@vmail.com',
		balance: 1337,
		subscriber: true
	};
</script>

<div class="profile-container">
	<div class="user-div">
		<h1>{user.name} {user.surname}</h1>
		<h4>Mail: {user.mail}</h4>
		<h4>Phone: {user.phone}</h4>
		{#if user.subscriber}
			<h5>Active subscription</h5>
		{:else}
			<h5>No current subscription</h5>
		{/if}
		<h5 class="api-key">API KEY: uiseHgt789y4587234ynas32asde21x</h5>
		<!-- TODO Show actual user API KEY in the future -->

		<!-- TODO Add a button that leads to a form that allows the user to update their info. -->
	</div>
	<div class="menu-div">
		<div>
			<h3>Balance: {user.balance}$</h3>
		</div>
		<div class="options-div">
			<h2><a href="/profile/travels">Travels</a></h2>
			<!-- TODO update href -->
			<h2><a href="/profile/invoice">Invoice</a></h2>
			<!-- TODO update href -->
			<h2><a href="/profile">Payment</a></h2>
			<!-- TODO update href -->
		</div>
	</div>
</div>
<footer>
	<h4 id="api"><a href="#api">API</a></h4>
	<!-- TODO Add route to API documentation -->
</footer>

<style lang="scss">
	.profile-container {
		display: flex;
		justify-content: space-evenly;
		height: 80vh;
	}

	.user-div {
		h1,
		h4,
		h5 {
			margin-bottom: calc($calculated-line-height / 2);
		}

		h5 {
			font-family: $text-font;
		}

		.api-key {
			word-break: break-all;
		}
	}

	.menu-div {
		display: flex;
		flex-direction: column;
	}

	.options-div {
		display: flex;
		flex-direction: column;
		justify-content: center;

		h2 {
			text-align: center;
			display: flex;

			a {
				flex-grow: 1;
			}
		}

		a {
			color: $text-color;
			background-color: $contrast-color;
			text-decoration: none;
			padding: 0.2em 0.5em;
			border-radius: 0.5rem;
			transition: all 0.3s ease;

			&:hover {
				background-color: darken($contrast-color, 10%);
			}
		}
	}

	footer {
		text-align: right;
		a {
			color: $text-color;
			&:hover {
				text-decoration: none;
			}
		}
	}

	@media screen and (max-width: 400px) {
		.profile-container {
			flex-direction: column;
		}
	}
</style>
