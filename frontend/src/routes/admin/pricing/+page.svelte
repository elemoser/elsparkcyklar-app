<script>
	let pricing = {
		Grundavgift: 4.99,
		'Pris per minut': 3.15
	};
</script>

<form>
	{#each Object.entries(pricing) as [name, price]}
		<label>
			{name}
			<input type="number" value={price} step="0.01" />
		</label>
	{/each}
	<input type="submit" />
</form>
