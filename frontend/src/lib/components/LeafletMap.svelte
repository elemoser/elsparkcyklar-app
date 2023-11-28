<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

    let mapElement;
    let map;
    let jsonData = null;

    onMount(async () => {
        if(browser) {
            const L = await import('leaflet');
            const response = await fetch('/data/test.json');

            if (response.ok) {
                jsonData = await response.json();
                console.log(jsonData[0].geojson.coordinates[0])
            } else {
                console.error('Failed to fetch JSON data');
            }

            let lat = jsonData[0].lat
            let lon = jsonData[0].lon

            map = L.map(mapElement).setView([lat, lon], 14);

            // create a red polygon from an array of LatLng points
            let lonLatArray = jsonData[0].geojson.coordinates[0];
            let latlngs = lonLatArray.map(pair => [pair[1], pair[0]]);

            var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);

            // zoom the map to the polygon
            map.fitBounds(polygon.getBounds());

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([lat,lon]).addTo(map)
                .bindPopup('Stockholm<br> (Center)')
                .openPopup();
        }
    });

    onDestroy(async () => {
        if(map) {
            console.log('Unloading Leaflet map.');
            map.remove();
        }
    });
</script>


<main>
    <div bind:this={mapElement}></div>
</main>

<style>
    @import 'leaflet/dist/leaflet.css';
    main div {
        height: 800px;
    }
</style>