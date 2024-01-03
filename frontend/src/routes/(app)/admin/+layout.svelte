<script>
	import '$lib/styles/main.scss';
	import { app_name } from '$lib/index.js';
	import { page } from '$app/stores';

	let windowLimit = 920;
	let currentPath;

	// Subscribe to changes in the $page store
	$: {
		currentPath = $page.url.pathname;
	}

	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<nav>
	<div class="logo">
		<p>{app_name}</p>
	</div>
	<ul>
		<li><a href="/">Kundvy</a></li>
	</ul>
</nav>

<div class="wrapper">
	{#if innerWidth < windowLimit}
		<div class="info">
			<span>
				OBS! Din nuvarande fönsterbredd på {innerWidth} px är för liten. För att kunna visa alla tabeller
				korrekt på adminsidan, se till att du besöker sidan med en enhet med en fönsterbredd på minst
				{windowLimit}px.
			</span>
		</div>
	{:else}
		<div class="admin-nav">
			<a class={currentPath === '/admin/map' ? 'active' : ''} href="/admin/map">Karta</a>
			<a class={currentPath === '/admin/bikes' ? 'active' : ''} href="/admin/bikes">Cyklar</a>
			<a class={currentPath === '/admin/cities' ? 'active' : ''} href="/admin/cities">Städer</a>
			<a class={currentPath === '/admin/parking' ? 'active' : ''} href="/admin/parking">Parkering</a
			>
			<a class={currentPath === '/admin/users' ? 'active' : ''} href="/admin/users">Kunder</a>
			<a class={currentPath === '/admin/bookings' ? 'active' : ''} href="/admin/bookings"
				>Bokningar</a
			>
			<a class={currentPath === '/admin/invoices' ? 'active' : ''} href="/admin/invoices"
				>Fakturor</a
			>
			<a class={currentPath === '/admin/pricing' ? 'active' : ''} href="/admin/pricing">Priser</a>
		</div>
	{/if}
	<div class="admin-main">
		<slot />
	</div>
</div>

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
	}

	.admin-nav {
		display: flex;
		flex-direction: row;

		a {
			color: $text-color;
			text-decoration: none;
			background-color: $contrast-color;
			border-radius: 5px 5px 0px 0px;
			margin: 1rem 1rem 0rem 0rem;
			padding: 0.4rem 0.6rem 0.6rem;
		}
	}

	.active {
		background-color: $dark-color !important;
		color: white !important;
	}

	.admin-main {
		background-color: $dark-color;
		color: white;
		border-radius: 0px 5px 5px;
		padding: 3rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 65vh;
	}

	.info {
		width: 80%;
		margin: 0.5rem auto;
		padding: 0.2rem 0.4rem;
		text-align: center;
		border: 1px solid darken($contrast-color, 50%);
		border-radius: 5px;
		background-color: $contrast-color;

		span {
			font-size: 0.9rem;
			color: $text-color;
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
