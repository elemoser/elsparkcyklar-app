<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let eventSource;
    let L;
    let mapElement;
	let map;

    onMount(async () => {
        // Get data via SSE
        eventSource = new EventSource('http://localhost:1338/v1/simulate');

        // Create a map
        if (browser) {
			L = await import('leaflet');

			// Coordinates for the maps view
            // For the current example (zoom on Östermalm)
			let lat = 59.33808;
			let lon = 18.08996;

			map = L.map(mapElement).setView([lat, lon], 14);

			// Create the map
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
		}
    });

    function startUpdates() {
        console.log("Sim started");
        let marker;
        let lat;
        let lon;
        eventSource.onmessage = function(event) {
            console.log(event.data);
            if (event.data.includes('finished')) {
                stopUpdates();
            } else {
                // The data is a string!
                lat = parseFloat(event.data.split(',')[0].slice(7));
                lon = parseFloat(event.data.split(',')[1].slice(6,-1));

                if (marker) {
                    marker.setLatLng([lat, lon]);
                } else {
                    marker = L.marker([lat, lon]).addTo(map);
                }
            }
        };
    }

    function stopUpdates() {
        console.log("Sim stopped");
        console.log("At the moment you need to refresh to start again");
        if (eventSource) {
            eventSource.close();
        }
    }

    onDestroy(async () => {
		if (map) {
			// console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<h1>Time Updates every second</h1>
<button on:click={startUpdates}>Start</button>
<button on:click={stopUpdates}>Stop</button>
<div bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
	div {
		height: 500px;
	}
</style>