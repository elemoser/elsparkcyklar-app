<script>
	export let data;
	const { invoice } = data;

	console.log(data);

	//TODO Allow user to pay the invoice
</script>

<h1>Invoice</h1>
{#if invoice}
	<h2>Invoice nr: {invoice.id}</h2>
	<h2>Price: {invoice.total_price}</h2>
	<form action=""> <!--TODO Add action for payment-->
		<button class="button">Pay</button>
	</form>
{:else}
	<p>Något väldigt fel har inträffat.</p>
{/if}

<style lang="scss">
	.button {
		border: 1px solid $con-border-col;
	}
</style>
