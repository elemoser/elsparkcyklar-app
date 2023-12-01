<script>
	import { app_name } from '$lib/index.js';

	const navLinks = [
		{ name: 'Home', url: '/' },
		{ name: 'About', url: '/about' },
		{ name: 'Login', url: '/login' },
		{ name: 'Profile', url: '/profile' }
	];
</script>

<nav>
	<div class="logo">
		<p>{app_name}</p>
	</div>
	<ul>
		{#each navLinks as link}
			<li><a href={link.url}>{link.name}</a></li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	nav {
		background-color: $dark-color;
		display: flex;
		justify-content: space-between;
		margin-bottom: $calculated-line-height;
	}

	.logo {
		font-family: $header-font;
		font-weight: 700;
		p {
			font-size: 2.5em;
			margin: 0.5em 0.5em;
			color: $contrast-color;
		}
	}

	ul {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 0;
	}

	li {
		list-style-type: none;
		padding-right: 1.5em;
	}

	a {
		text-decoration: none;
		color: $text-color;
		font-family: $header-font;
		font-weight: 700;
		background-color: $contrast-color;
		border-radius: 0.2rem;
		padding: 0.5em 1em;
		transition: all 0.3s ease;

		&:hover {
			background-color: darken($contrast-color, 10%);
		}
	}

	@media screen and (max-width: 400px) {
		nav {
			justify-content: center;
		}

		ul {
			padding: 1em;
			background-color: $dark-color;
			justify-content: space-evenly;
			position: fixed;
			bottom: 0;
			width: 100vw;

			li {
				padding-right: unset;
			}

			a {
				padding: 0.3em 0.7em;
			}
		}
	}
</style>
