<script>
	export let data;

	const { cityId } = data;
	const { bikes } = data;
</script>

<h1>Välj en cykel</h1>
{#if bikes.error}
	<p>{bikes.error}</p>
{:else}
	{#each bikes.bikes as bike}
		<div class="bike-container">
			<a href="{cityId}/{bike.id}">
				<div class="bike-data">
					<h2>Bike {bike.id}</h2>
					<h5>Battery: {bike.battery}%</h5>
					<h5>{bike.state}</h5>
				</div>
			</a>
		</div>
	{/each}
{/if}

<a href="/rent">Tillbaka</a>

<style lang="scss">
	.bike-container {
		border: 1px solid $con-border-col;
		border-radius: 0.25rem;
		background-color: $contrast-color;
		max-width: 250px;
		margin-bottom: $calculated-line-height;

		&:hover {
			background-color: darken($contrast-color, 10%);
		}

		a {
			text-decoration: none;
		}
	}

	.bike-data {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0.5em;

		h5 {
			margin-bottom: calc($calculated-line-height / 4);
			text-decoration: none;
			color: lighten($text-color, 5%);
		}
	}

	h2 {
		margin-bottom: calc($calculated-line-height / 3);
	}
</style>
