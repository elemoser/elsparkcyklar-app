<script>
	import { goto } from '$app/navigation';
	import { updateUser } from '$lib/stores/user.js';
	export let data;
	const { invoice } = data;
	const { user } = data;
	let err;

	async function handleSubmit(e) {
		e.preventDefault();

		user.balance >= invoice.total_price ? payInvoice() : (err = 'Insufficient funds');
	}

	async function payInvoice() {
		const invoiceObj = {
			status: 'payed'
		};

		const userObj = {
			balance: user.balance - invoice.total_price
		};

		const responseInvoice = await fetch(`http://localhost:1338/v1/invoice/id/${invoice.id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(invoiceObj)
		});

		const responseUpdate = await fetch(`http://localhost:1338/v1/users/id/${user.id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userObj)
		});

		if (responseInvoice.status === 200 && responseUpdate.status === 200) {
			updateUser(userObj);
			goto('/profile/invoice');
		}
	}
</script>

<h1>Invoice</h1>
{#if invoice}
	<h2>Invoice nr: {invoice.id}</h2>
	<h2>Price: {parseFloat(invoice.total_price).toFixed(2)}</h2>
	<p>Status: {invoice.status}</p>
	<button class="button" on:click={handleSubmit}>Pay</button>
	{#if err}
		<p class="error">{err}</p>
	{/if}
{:else}
	<p>Något väldigt fel har inträffat.</p>
{/if}

<style lang="scss">
	.button {
		border: 1px solid $con-border-col;
	}

	.error {
		text-align: center;
		color: white;
		margin-top: $calculated-line-height;
		background-color: red;
		border-radius: 0.3rem;
		border: 1px solid dakren(red, 20%);
		padding: 1em;
	}
</style>
