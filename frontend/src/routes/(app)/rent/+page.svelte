<script>
	//TODO Hämta städerna via API:et och skriv ut på sidan.
	export let data;

	let citySelected = false;
	let cityBikes = [];

	function getBikes(id) {
		citySelected = true;
		cityBikes = data.bikes[id]; //TODO byt ut detta mot funktion i API:et för att hämta tillgängliga cyklar baserat på stadens id.
	}

	function unsetSelected() {
		citySelected = false;
	}
</script>

{#if citySelected}
	<h1>Välj en cykel</h1>
	{#each cityBikes as bike}
		<h2><a href="rent/{bike.id}">{bike.name}</a></h2>
	{/each}
	<button on:click={unsetSelected}>Tillbaka</button>
{:else}
	<h1>Välj en stad</h1>
	<div class="city-div">
		{#each data.res as city}
			<button on:click={getBikes(city.slug)}>{city.name}</button>
		{/each}
	</div>
{/if}

<style lang="scss">
	a {
		font-size: calc($base-font-size) * 1.25;
		color: $text-color;
		&:hover {
			cursor: pointer;
			text-decoration: none;
		}
	}

	button {
		color: $text-color;
		font-size: calc($base-font-size) * 1.25;
		margin-bottom: calc($calculated-line-height / 2);
		display: block;
		background-color: unset;
		border: unset;
		text-decoration: underline;
		&:hover {
			cursor: pointer;
			text-decoration: none;
		}
	}
</style>
