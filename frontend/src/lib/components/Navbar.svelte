<script>
	import { app_name } from '$lib/index.js';
	export let userData;

	$: navLinks = [
		userData.active ? { name: 'Active', url: '/active' } : { name: 'Rent', url: '/rent' },
		{ name: 'Profile', url: '/profile' }
	];
</script>

{#if userData && userData.role === 'admin'}
	<nav>
		<div class="logo">
			<a href="/"><p>{app_name}</p></a>
		</div>
		<ul>
			{#each navLinks as link}
				<li><a class="button" href={link.url}>{link.name}</a></li>
			{/each}
			<li><a class="button" href="/admin">Admin</a></li>
		</ul>
	</nav>
{:else}
	<nav>
		<div class="logo">
			<a href="/"><p>{app_name}</p></a>
		</div>
		<ul>
			{#each navLinks as link}
				<li><a class="button" href={link.url}>{link.name}</a></li>
			{/each}
		</ul>
	</nav>
{/if}

<style lang="scss">
	a {
		text-decoration: none;
	}

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
			z-index: 9999; //force ontop of maps
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
