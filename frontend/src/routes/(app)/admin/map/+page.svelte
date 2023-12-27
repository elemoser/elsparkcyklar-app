<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';

	export let data;
    let L;
    let mapElement;
	let map;
	let bikeLayer;
	let parkingLayer;
	// let scooterIcon;
	let showBikes = false;
	let showParkings = false;
    onMount(async () => {
        // Create a map
        if (browser) {
			L = await import('leaflet');
			// Coordinates for the maps view
            // For the current example (zoom on Östermalm)
			let lat = 59.33808;
			let lon = 18.08996;
			map = L.map(mapElement);
			// Create the map
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
			// Create a layer for markers
			bikeLayer = L.layerGroup().addTo(map);
			parkingLayer = L.layerGroup().addTo(map);
			if (data.props.data.city) {
				let cities = data.props.data.city;
				let bounds;
				
				for (let key in cities) {
					bounds = eval(cities[key].bounds);
					// Adjust for formatting
					if (cities[key].name === 'Linköping') {
						bounds = bounds[0];
					}
					if (cities[key].name === 'Uppsala') {
						bounds = bounds[1];
					}
					// Sort the coordinates in the right order for leaflet
					let sortedLatLon = [];
					for (let pair of bounds[0]) {
						sortedLatLon.push([pair[1], pair[0]]);
					}
					// Create polygon
					L.polygon(sortedLatLon, { color: '#9747ff', weight: 1, fill: false }).addTo(map);
					}
			}
			map.setView([lat, lon], 5);
		}
    });
    onDestroy(async () => {
		if (map) {
			// console.log('Unloading Leaflet map.');
			map.remove();
		}
	});	
	function toggleBikes() {
		showBikes = !showBikes;
		if (showBikes) {
			// scooterIcon = L.icon({
			// 	iconUrl: "/kick-scooter-icon.png",
			// 	iconSize:     [20, 25], // size of the icon
			// 	// iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
			// 	// popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			// });
			if (data.props.data.bike) {
				let coordinates = [];
				let text = '';
				for (let key in data.props.data.bike) {
					coordinates = data.props.data.bike[key].position.split(', ');
					coordinates = coordinates.map((x) => parseFloat(x));
					text = `Cykel ${data.props.data.bike[key].id}`;
					L.marker(coordinates).addTo(bikeLayer).bindPopup(text);
				}
			}
		} else {
			bikeLayer.clearLayers();
		}
	}
	function toggleParking() {
		showParkings = !showParkings;
		
		if (showParkings) {
			let	parkingIcon = L.icon({
				iconUrl: "/parking-area.png",
				iconSize:     [30, 35], // size of the icon
				// iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
				// popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
			if (data.props.data.parking) {
				let coordinates = [];
				let text = '';
				let rectangle;
				for (let key in data.props.data.parking) {
					coordinates = data.props.data.parking[key].bounds.split(', ');
					coordinates = coordinates.map((x) => parseFloat(x));
					text = `${data.props.data.parking[key].name} (${data.props.data.parking[key].number_of_chargers} laddare)`;
					// Create rectangle
					rectangle = L.rectangle([[coordinates[0],coordinates[1]],[coordinates[2],coordinates[3]]], {color: 'yellow', weight: 1, fill: false}).addTo(parkingLayer);
					// Create marker in center of rectangle
					coordinates = rectangle.getCenter();
					L.marker([coordinates.lat, coordinates.lng], {icon: parkingIcon}).addTo(parkingLayer).bindPopup(text);
				}
			}
		} else {
			parkingLayer.clearLayers();
		}
	}
	function zoomIn(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const lat = formData.get('lat');
		// const lon = formData.get('lon');
		let coordinates = lat.split(', ');
		coordinates = coordinates.map((x) => parseFloat(x));
		map.flyTo(coordinates, 14);
	}
</script>

<form class="custom-form" on:submit={zoomIn}>
	<label>
		Zoom
		<input name="lat" type="text" placeholder="lat, lon" required>
		<!-- <input name="lon" type="number" step="0.000001" placeholder="lon" required> -->
	</label>
	<input type="submit" value="Ta mig dit">
</form>

<label>
	<input type="checkbox" on:click={toggleBikes}>
	cyklar
</label>
<label>
	<input type="checkbox" on:click={toggleParking}>
	parkeringar
</label>
<div class="map" bind:this={mapElement} />
<div>
	<a href="https://www.flaticon.com/free-icons/map-and-location" title="map and location icons">Map and location icons created by ono_tono - Flaticon</a>
	<a href="https://www.flaticon.com/free-icons/parking" title="parking icons">Parking icons created by ono_tono - Flaticon</a>
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	.map {
		height: 500px;
	}
	.custom-form {
		display: flex;
		flex-direction: row;
	}
</style>
