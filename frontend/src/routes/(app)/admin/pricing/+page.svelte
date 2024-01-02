<script>
	export let data;
	let edit = false;
	let price = {};

	if (data.props.data.price) {
		price = data.props.data.price;
	}

	async function updatePricing(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		// const id = formData.get('id');

		const data = {
			start_fee: formData.get('start_fee'),
			cost_per_minute: formData.get('cost_per_minute'),
			free_parking_fee: formData.get('cost_per_minute_if_parking')
		};

		const response = await fetch(`http://localhost:1338/v1/price`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		const responseUpdated = await fetch(`http://localhost:1338/v1/price`, {
			method: 'GET',
			credentials: 'include'
		});

		if (response.status === 200 && responseUpdated.status === 200) {
			const dataUpdated = await responseUpdated.json();
			
			price = dataUpdated.price;
			edit = false;
		} else {
			console.log(`Failed to update price:`, response.statusText);
			//TODO error handling
		}
	}
</script>

{#if data.props.data.price}
	<form class="submit-form" on:submit={updatePricing}>
		<input type="number" name="id" value={price.id} hidden />
		<label id="start_fee">
			Startavgift
			<input type="number" name="start_fee" value={price.start_fee} readonly={!edit} />
		</label>
		<label id="cost_per_minute">
			Kostnad per minut
			<input type="number" name="cost_per_minute" value={price.cost_per_minute} readonly={!edit} />
		</label>
		<label id="cost_per_minute_if_parking">
			Kostnad per minut om parkerad
			<input type="number" name="cost_per_minute_if_parking" value={price.cost_per_minute_if_parking} readonly={!edit} />
		</label>
		{#if edit}
			<input type="submit" value="Spara" />
		{/if}
	</form>
	{#if edit}
		<div class="check">
			<p>Är du säker på att du vill spara dina ändringar i databasen?</p>
			<button class="btn-dark" on:click={() => (edit = false)}>Avbryt</button>
		</div>
	{:else}
		<button class="btn-light" on:click={() => (edit = true)}>Redigera</button>
	{/if}
{/if}

<style lang="scss">
	p {
		color: white;
	}

	.check {
		text-align: center;
		p {
			font-size: 1rem;
		}
	}
</style>
