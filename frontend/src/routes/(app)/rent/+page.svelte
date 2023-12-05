<script>
	export let data;
	const { cities } = data;
</script>

<h1>Välj en stad</h1>
<div class="city-div">
	{#each cities.city as city}
		<h2><a href="rent/{city.id}">{city.name}</a></h2>
	{/each}
</div>

<style lang="scss">
	h2 {
		margin-bottom: calc($calculated-line-height / 2);
		a {
			font-size: calc($base-font-size) * 1.25;
			color: $text-color;
			&:hover {
				cursor: pointer;
				text-decoration: none;
			}
		}
	}
</style>
