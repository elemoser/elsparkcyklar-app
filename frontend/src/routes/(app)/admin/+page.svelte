<script>
	import { app_name } from '$lib/index.js';
</script>

<h1>Välkommen till adminsidan för {app_name} appen</h1>

<p>
	Härifrån kan du hantera kundkonton, alla bokningar och reseavgifter samt alla cyklar, aktiva
	städer och parkeringsstationer. För en geografisk placering av alla städer, cyklar och
	parkeringsplatser, se <a href="admin/map">kartöversikten</a>.
</p>

<style lang="scss">
	h1,
	p {
		color: white;
		hyphens: auto;
	}

	a,
	a:visited {
		color: $contrast-color;
	}

	a:hover {
		color: darken($contrast-color, 20%);
	}
</style>
