<script>
	export let data;
	let edit = false;
	let price = {
		id: 0,
		start_fee: 0,
		start_free_park_discount: 0,
		free_parking_fee: 0,
		cost_per_minute: 0
	};

	if (data.props.data.price) {
		price['id'] = data.props.data.price.id;
		price['start_fee'] = data.props.data.price.start_fee;
		price['start_free_park_discount'] = data.props.data.price.start_free_park_discount;
		price['free_parking_fee'] = data.props.data.price.free_parking_fee;
		price['cost_per_minute'] = data.props.data.price.cost_per_minute;
	}

	async function updatePricing(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		// const id = formData.get('id');

		const data = {
			start_fee: formData.get('start_fee'),
			cost_per_minute: formData.get('cost_per_minute'),
			free_parking_fee: formData.get('free_parking_fee'),
			start_free_park_discount: formData.get('start_free_park_discount')
		};

		const response = await fetch(`http://localhost:1338/v1/price`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.status === 200) {
			console.log(response);
			edit = false;
			// TODO check why values go back to before after refreshing
		} else {
			console.log(`Failed to update price:`, response.statusText);
			//TODO error handling
		}
	}
</script>

{#if data.props.data.price}
	<form class="submit-form" on:submit={updatePricing}>
		<input type="number" value={price.id} hidden />
		<label id="start_fee">
			Startavgift
			<input type="number" value={price.start_fee} readonly={!edit} />
		</label>
		<label id="cost_per_minute">
			Kostnad per minut
			<input type="number" value={price.cost_per_minute} readonly={!edit} />
		</label>
		<label id="free_parking_fee">
			Fri parkering avgift
			<input type="number" value={price.free_parking_fee} readonly={!edit} />
		</label>
		<label id="start_free_park_discount">
			Fri parkering rabatt
			<input
				type="number"
				value={price.start_free_park_discount}
				min="0"
				max="1"
				step="0.1"
				readonly={!edit}
			/>
		</label>
		{#if edit}
			<input type="submit" value="Spara" />
		{/if}
	</form>
	{#if edit}
		<button on:click={() => (edit = false)}>Avbryta</button>
	{:else}
		<button on:click={() => (edit = true)}>Redigera</button>
	{/if}
{/if}

<style lang="scss">
	// More style
</style>
