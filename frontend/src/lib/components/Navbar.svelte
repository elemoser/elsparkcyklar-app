<script>
	import { app_name } from '$lib/index.js';

	const navLinks = [
		{ name: 'Home', url: '/' },
		{ name: 'About', url: '/about' },
		{ name: 'Profile', url: '/profile' },
		{ name: 'Rent', url: '/rent' },
		{ name: 'Admin', url: '/admin' }
	];
</script>

<nav>
	<div class="logo">
		<p>{app_name}</p>
	</div>
	<ul>
		{#each navLinks as link}
			<li><a class="button" href={link.url}>{link.name}</a></li>
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
