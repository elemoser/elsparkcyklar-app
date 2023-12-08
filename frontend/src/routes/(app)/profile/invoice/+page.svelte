<script>
	export let data;

	let { invoices } = data;

	//Ugly fix to handle case when only 1 exists (non-iterable).
	if (!Array.isArray(invoices) && invoices != undefined) {
		invoices = [invoices];
	}

	//TODO Make pretty.
	//TODO make responsive.
</script>

<div class="invoice-wrapper">
	<h1>Invoices</h1>
	{#if invoices}
		{#each invoices as invoice}
			<div class="invoice-row">
				<p>{invoice.id}</p>
				<!--
				<div class="date-div">
					<p>{invoice.created}</p>
					<p>-</p>
					<p>{invoice.due}</p>
				</div>
				-->
				<p>Price: {invoice.total_price}</p>
				{#if invoice.status === "payed"}
					<p class="paid">Paid</p>
				{:else}
					<a href="/profile/invoice/{invoice.id}">Pay</a>
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
			color: $text-color;
			background-color: $contrast-color;
			font-family: $header-font;
			font-weight: 700;
			font-size: $base-font-size;
			text-decoration: none;
			border-radius: 0.25rem;
			border: 1px solid $con-border-col;
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
