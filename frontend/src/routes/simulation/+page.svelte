<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let eventSource;
    let L;
    let mapElement;
	let map;
    let markerLayer;

    onMount(async () => {
        // Get data via SSE
        // eventSource = new EventSource('http://localhost:1338/v1/simulate');

        // Create a map
        if (browser) {
			L = await import('leaflet');

			// Coordinates for the maps view
            // For the current example (zoom on Östermalm)
			let lat = 59.33808;
			let lon = 18.08996;

			map = L.map(mapElement).setView([lat, lon], 12);

			// Create the map
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

            // Create a layer for markers
            markerLayer = L.layerGroup().addTo(map);
		}
    });

    function newEventSource() {
        // Get data via SSE
        eventSource = new EventSource('http://localhost:1338/v1/simulate');
    }

    function startUpdates() {
        // Remove markers from map if any
        markerLayer.clearLayers();

        // Start EventSource
        if (!eventSource || eventSource.readyState === 2) {
            newEventSource();
            console.log("Sim started");
        }

        let data = {};
        let simulationDone = false;
        let marker;
        let markers = {};
        let lat = 0;
        let lon = 0;

        // Function triggered at each eventSource message
        eventSource.onmessage = function(event) {
            data = JSON.parse(event.data);
            simulationDone = data['simulationDone'] ? data['simulationDone'] : false;

            if (simulationDone) {
                stopUpdates();
            } else {
                console.log(data);
                for (let key in data) {
                    lat = parseFloat(data[key].lat);
                    lon = parseFloat(data[key].lon);

                    if (markers[key]) {
                        marker = markers[key];
                        marker.setLatLng([lat, lon]);
                    } else {
                        marker = L.marker([lat, lon]).addTo(markerLayer);
                        markers[key] = marker;
                    }
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