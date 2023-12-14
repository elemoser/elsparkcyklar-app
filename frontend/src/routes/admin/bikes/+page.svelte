<script>
	import Table from '$lib/components/Table.svelte';
    export let data;
	let bikes = {};

    if (data.props.data.bike) {
        let bikeData = data.props.data.bike;
        let body = {};
        let links = {};
        let content = [];
        let city_id;
        let name;

        // Create table headers
        content = Object.keys(bikeData[0]);
        content.splice(2, 1, 'city'); // replace city_id header
        bikes['header']  = content;
        // Create table content
        for (const row in bikeData) {
            content = Object.values(bikeData[row]);
            // Replace city id with name
            if (data.props.data.city) {
                city_id = content.splice(2, 1);
                name = getCityName(data.props.data.city, city_id);
                content.splice(2, 0, name);
            }
            body[row] = content;
            links[row] = [`/admin/bikes/${bikeData[row].id}`,"view"];
        }
        bikes['body'] = body;
        bikes['links'] = links;
    }

    // Function to retrieve the city name
    function getCityName(object, id) {
        let name = '';

        for (let item in object) {
            if (object[item].id == id) {
                name = object[item].name;
            }
        }

        return name;
    }
    //TODO enable searching the table
</script>

{#if data.props.data.error }
    <p>{ data.props.data.error }</p>
{:else}
    <!-- <form method="POST">
        <input name="search_input" type="text">
        <input type="submit" value='Sök'>
    </form> -->
    <button><a href="/admin/bikes/new">+</a></button>
    <Table data={ bikes }/>
{/if}
