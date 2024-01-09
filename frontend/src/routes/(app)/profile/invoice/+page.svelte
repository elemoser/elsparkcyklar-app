<script>
	export let data;

	let { invoices } = data;

	//Ugly fix to handle case when only 1 exists (non-iterable).
	if (!Array.isArray(invoices) && invoices != undefined) {
		invoices = [invoices];
	}
</script>

<div class="invoice-wrapper">
	<h1>Invoices</h1>
	{#if invoices}
		{#each invoices as invoice}
			<div class="invoice-row">
				<p>{invoice.id}</p>
				<p>Price: {parseFloat(invoice.total_price).toFixed(2)}</p>
				{#if invoice.status === 'payed'}
					<p class="paid">Paid</p>
				{:else}
					<a class="button" href="/profile/invoice/{invoice.id}">Pay</a>
				{/if}
			</div>
		{/each}
		<a href="/profile">back</a>
	{:else}
		<p>You have no invoices.</p>
		<a href="/profile">back</a>
	{/if}
</div>

<style lang="scss">
	.invoice-wrapper {
		margin: 0 auto;
		max-width: 75em;
	}

	.invoice-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0.25em;
		border-bottom: 1px solid $text-color;
		margin-bottom: $calculated-line-height;

		p {
			margin-bottom: 0;
		}

		.paid {
			padding: 0 0.5em;
		}

		a {
			font-size: $base-font-size;
			border: 1px solid $con-border-col;
			padding: 0.2em 0.7em;
		}
	}
</style>
