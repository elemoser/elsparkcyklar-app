<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let data = {};
	// data format
	// data = {
	//     markers: {
	//         0: {
	// 			text: "point A",
	// 			coordinates: ["lat", "lon"],
	//			radius: 500
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
	let customIcon;

	onMount(async () => {
		if (browser) {
			const L = await import('leaflet');

			// Coordinates for the maps view
			let lat = data.markers ? parseFloat(data.markers[0].coordinates[0]) : 59.3293;
			let lon = data.markers ? parseFloat(data.markers[0].coordinates[1]) : 18.0686;

			map = L.map(mapElement).setView([lat, lon], 10);

			// Create the map
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			// Draw polygon if data exists
			if (data.polygon) {
				for (let key in data.polygon) {
					addPolygoneToMap(data.polygon[key]);
				}
			}

			if (data.markers) {
				for (const key in data.markers) {
					lat = parseFloat(data.markers[key].coordinates[0]);
					lon = parseFloat(data.markers[key].coordinates[1]);

					if (data.markers[key].state === 'available') {
						customIcon = new L.Icon({
							iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
							shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
							});
						L.marker([lat, lon], {icon: customIcon}).addTo(map).bindPopup(data.markers[key].text);
					} else if (data.markers[key].state === 'occupied') {
						customIcon = new L.Icon({
							iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
							shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
							});
						L.marker([lat, lon], {icon: customIcon}).addTo(map).bindPopup(data.markers[key].text);
					} else if (data.markers[key].state === 'disabled') {
						customIcon = new L.Icon({
							iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
							shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
							});
						L.marker([lat, lon], {icon: customIcon}).addTo(map).bindPopup(data.markers[key].text);
					} else if (data.markers[key].radius) {
						customIcon = new L.Icon({
							iconUrl: '/parking-area.png',
							iconSize: [30, 35]
						});
						L.marker([lat, lon], {icon: customIcon}).addTo(map).bindPopup(data.markers[key].text);
					} else {
						L.marker([lat, lon]).addTo(map).bindPopup(data.markers[key].text);
					}

					if (data.markers[key].radius) {
						L.circle([lat, lon], data.markers[key].radius,{
						stroke: false,
						color: 'orange'
					}).addTo(map);
					}
				}
			}
		}
	});

	function addPolygoneToMap(polygoneData) {
		// Transform the incomming string of coordinates into arrays
		let boundsArray = eval(polygoneData.coordinates);

		// Adjust for formatting
		if (polygoneData.text === 'Linköping') {
			boundsArray = boundsArray[0];
		}

		if (polygoneData.text === 'Uppsala') {
			boundsArray = boundsArray[1];
		}

		// Sort the coordinates in the right order for leaflet
		let sortedLatLon = [];

		for (let pair of boundsArray[0]) {
			sortedLatLon.push([pair[1], pair[0]]);
		}

		// Create polygon
		let polygon = L.polygon(sortedLatLon, { color: 'red', weight: 1, fill: false }).addTo(map);

		// Add polygon to map
		if (polygoneData.focus) {
			map.fitBounds(polygon.getBounds());
		}
		
		// // Get the lat and lon for the center of the polygone
		// // Add a marker at the center of the polygon containing the name
		// let coordinates = polygon.getCenter();
		// L.marker([coordinates.lat, coordinates.lng])
		// 	.addTo(map)
		// 	.bindPopup(polygoneData.text)
		// 	.openPopup();
	}

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
