<script>
    import LeafletMap from "$lib/components/LeafletMap.svelte";
    export let data;
    let mapData = {}
    // mapData needs to be formatted the following way
	// data = {
	//     markers: {
	//         0: {
	// 			text: "point A",
	// 			coordinates: ["lat", "lon"]
	// 		   },
	//         1: {
	// 			text: "point B",
	// 			coordinates: ["lat", "lon"]
	// 		    },
	//     },
	//     polygon: {
	//         text: "city A",
	//         coordinates: [...]
	//     },
	// }

    if (data.props.data.bike) {
        const obj = (data.props.data.bike)
        let markers = {};

        for (let key in obj) {
            markers[key] = {
                text: obj[key].id,
                coordinates: [
                    parseFloat(obj[key].position.split(', ')[0]),
                    parseFloat(obj[key].position.split(', ')[1])
                ]
            }
        }
        mapData['markers'] = markers;
    }
</script>

{#if data.props.data.error}
    <p>Something went wrong!</p>
{:else}
<LeafletMap data={ mapData }/>
{/if}