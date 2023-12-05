<script>
    import Form from '$lib/components/Form.svelte';
    /** @type {import('./$types').PageData} */
    export let data;
    let type = '';

    if (data.props.target.charAt(0) == 'k') {
        type = 'user';
    }
</script>

{#if data}
    <h1>Details for { type } { data.props.target.slice(1) }</h1>
    <!-- {#each Object.entries(data.props.data) as [key, value]}
        <p>{ key }: { value }</p>
    {/each} -->
    <Form data={ data.props.data } />
{/if}