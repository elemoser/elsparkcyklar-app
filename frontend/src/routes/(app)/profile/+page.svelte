<script>
	import { onMount } from 'svelte';
	let user = {};

	async function userData() {
		const id = sessionStorage.getItem('user');
		const response = await fetch(`http://localhost:1338/v1/users/id/${id}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();

		return res.user;
	}

	function deleteSession() {
		sessionStorage.removeItem('user');

		document.getElementById('logoutForm').submit();
	}

	onMount(async () => {
		user = await userData();
	});
</script>

<div class="profile-container">
	<div class="user-div">
		<h1>{user.username}</h1>
		<h4>Mail: {user.mail || 'Showcasing@whatitcouldlooklike.com'}</h4>
		<h4>Phone: {user.phone || '070123456789'}</h4>
		<h5>Role: {user.role}</h5>

		<a class="button" href="/profile/update">Update profile</a>
	</div>
	<div class="menu-div">
		<div>
			<h3>Balance: {parseFloat(user.balance).toFixed(2)}$</h3>
		</div>
		<div class="options-div">
			<h2><a class="button" href="/profile/travels">Travels</a></h2>
			<h2><a class="button" href="/profile/invoice">Invoice</a></h2>
			<h2><a class="button" href="/profile/payment">Payment</a></h2>

			<form id="logoutForm" method="POST" action="?/logout">
				<button class="button" type="submit" on:click={deleteSession}>Logout</button>
			</form>
		</div>
	</div>
</div>
<footer>
	<h4><a href="https://github.com/elemoser/elsparkcyklar-app/wiki" target="_blank">API</a></h4>
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

			&:last-of-type {
				margin-bottom: $calculated-line-height;
			}
		}

		a {
			font-weight: 700;
			font-family: $header-font;
		}

		.api-key {
			word-break: break-all;
		}
	}

	.menu-div {
		display: flex;
		flex-direction: column;
	}

	.user-div,
	.options-div {
		a {
			background-color: $contrast-color;
			border: 1px solid $con-border-col;
			padding: 0.2em 0.5em;
			border-radius: 0.5rem;

			&:hover {
				background-color: darken($contrast-color, 10%);
			}
		}
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

		form {
			margin: 0 auto;
		}

		button {
			border: 1px solid $con-border-col;

			&:hover {
				background-color: #f37474;
				border: 1px solid darken(#f37474, 20%);
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
