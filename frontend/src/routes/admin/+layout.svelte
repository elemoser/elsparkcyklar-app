<script>
	import '$lib/styles/main.scss';
	import { app_name } from '$lib/index.js';
	import { page } from '$app/stores';  

	let currentPath;

	// Subscribe to changes in the $page store
	$: {
		currentPath = $page.url.pathname;
	}	
</script>

<nav>
	<div class="logo">
		<p>{app_name}</p>
	</div>
	<ul>
		<li><a href="/">Kundvy</a></li>
	</ul>
</nav>

<div class="wrapper">
	<div class="admin-nav">
		<!-- class="{currentPath = '/admin/users' ? 'admin-nav-active': ''}" -->
		<a class="{currentPath ==='/admin/users' ? 'active': ''}" href="/admin/users">Kunder</a>
		<a class="{currentPath === '/admin/bikes' ? 'active': ''}" href="/admin/bikes">Cyklar</a>
		<a class="{currentPath === '/admin/cities' ? 'active': ''}" href="/admin/cities">Städer</a>
		<a class="{currentPath === '/admin/map' ? 'active': ''}" href="/admin/map">Karta</a>
		<a class="{currentPath === '/admin/pricing' ? 'active': ''}" href="/admin/pricing">Priser</a>
	</div>
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
