<script>
	//TODO fetch user invoices.
	//TODO make responsive.
	const invPrototype = [
		{
			id: 123123,
			price: 123,
			created: '2023-12-01',
			due: '2023-12-31',
			paid: false
		},
		{
			id: 123456,
			price: 353,
			created: '2023-12-01',
			due: '2023-12-31',
			paid: true
		}
	];
</script>

<div class="invoice-wrapper">
	<h1>Invoices</h1>
	{#each invPrototype as invoice}
		<div class="invoice-row">
			<p>{invoice.id}</p>
			<div class="date-div">
				<p>{invoice.created}</p>
				<p>-</p>
				<p>{invoice.due}</p>
			</div>
			<p>{invoice.price}</p>
			{#if invoice.paid}
				<p class="paid">Paid</p>
			{:else}
				<a href="/profile/invoice/{invoice.id}">Pay</a>
				<!-- TODO Add a route to pay specific invoice -->
			{/if}
		</div>
	{/each}
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
			color: $text-color;
			background-color: $contrast-color;
			font-family: $header-font;
			font-weight: 700;
			font-size: $base-font-size;
			text-decoration: none;
			border-radius: 0.25rem;
			padding: 0.2em 0.7em;

			&:hover {
				background-color: darken($contrast-color, 5%);
			}
		}
	}

	.date-div {
		display: flex;
		gap: 1em;
	}
</style>
