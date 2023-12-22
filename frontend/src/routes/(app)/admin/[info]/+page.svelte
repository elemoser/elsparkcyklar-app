<script>
	// TODO remove?
	import Form from '$lib/components/Form.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	let type = '';

	if (data.props.target.charAt(0) == 'k') {
		type = 'kund';
	} else if (data.props.target.charAt(0) == 'c') {
		type = 'cyckel';
	}
</script>

{#if data}
	<h2>Detaljer för {type} {data.props.target.slice(1)}</h2>
	<Form data={data.props.data} />
{/if}
