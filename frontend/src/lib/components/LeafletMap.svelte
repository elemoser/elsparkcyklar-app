<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let data = {};
	// data format
	// data = {
	//     markers: {
	//         0: {
	// 			text: "point A",
	// 			coordinates: ["lat", "lon"]
	// 		},
	//         1: {
	// 			text: "point B",
	// 			coordinates: ["lat", "lon"]
	// 		},
	//     },
	//     polygon: {
	//         text: "city A",
	//         coordinates: [...]
	//     },
	// }
	let mapElement;
	let map;


	onMount(async () => {
		if (browser) {
			const L = await import('leaflet');

			// Coordinates for the maps view
			let lat = data.markers ? data.markers[0].coordinates[0] : 59.3293;
			let lon = data.markers ? data.markers[0].coordinates[1] : 18.0686;

			map = L.map(mapElement).setView([lat, lon], 14);

			// Create the map
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// Draw polygon if data exists
			if (data.polygon) {
				// Transform the incomming string of coordinates into arrays
				let boundsArray = eval(data.polygon.coordinates);

				// Adjust for formatting
				if (data.polygon.text === 'Linköping') {
					boundsArray = boundsArray[0]; 
				}

				if (data.polygon.text === 'Uppsala') {
					boundsArray = boundsArray[1]; 
				}
				
				// Sort the coordinates in the right order for leaflet
				let sortedLatLon = [];
				
				for (let pair of boundsArray[0]) {
					sortedLatLon.push([pair[1], pair[0]]);
				}

				// Create polygon
				let polygon = L.polygon(sortedLatLon, { color: 'red' }).addTo(map);
				// Get the lat and lon for the center of the polygone
				let coordinates = polygon.getCenter();

				// Add polygon to map
				map.fitBounds(polygon.getBounds());
				// Add a marker at the center of the polygon containing the name
				L.marker([coordinates.lat, coordinates.lng]).addTo(map).bindPopup(data.polygon.text).openPopup();
			}

			if (data.markers) {
				for (const key in data.markers) {
					lat = data.markers[key].coordinates[0];
					lon = data.markers[key].coordinates[1];
					L.marker([lat, lon]).addTo(map).bindPopup(data.markers[key].text).openPopup();
				}
			}
		}
	});

	onDestroy(async () => {
		if (map) {
			// console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<div bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
	div {
		height: 500px;
	}
</style>
