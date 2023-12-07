<script>
    import Table from '$lib/components/Table.svelte';
    
    export let data;
    let cities = {};

    if (data && data.props.data.city) {
        let cityData = data.props.data.city;
        let body = {};
        let content;

        // Create table headers
        content = Object.keys(cityData[0]);
        content.pop();
        cities['header']  = content;

        // Create table content
        for (const row in cityData) {
            content = Object.values(cityData[row]);
            content.pop();
            body[row] = content;
        }
        cities['body'] = body;
        cities['links'] = {}
    }
    console.log(cities);
</script>

<form>
    <input type="text">
    <input type="submit" value='Sök'>
</form>

{#if cities }
    <Table data={ cities }/>
{/if}