<script>
	import { app_name } from '$lib/index.js';
	import { user } from '$lib/stores/user';
	import { onDestroy } from 'svelte';

	let userData;

	const unsubscribe = user.subscribe(val => {
		userData = val;
	})

	const navLinksAdm = [
		{ name: 'Rent', url: '/rent' },
		{ name: 'Profile', url: '/profile' },
		{ name: 'Admin', url: '/admin' }
	];

	const navLinks = [
		{ name: 'Rent', url: '/rent' },
		{ name: 'Profile', url: '/profile' },
		{ name: 'Admin', url: '/admin' }
	];

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if userData && userData.role === 'admin'}
	<nav>
		<div class="logo">
			<p>{app_name}</p>
		</div>
		<ul>
			{#each navLinksAdm as link}
				<li><a class="button" href={link.url}>{link.name}</a></li>
			{/each}
		</ul>
	</nav>
{:else}
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
{/if}

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
