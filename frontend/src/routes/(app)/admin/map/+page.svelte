<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let data;
	let L;
	let mapElement;
	let map;
	let bikeLayer;
	let parkingLayer;
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
					L.polygon(sortedLatLon, { color: 'red', weight: 1, fill: false }).addTo(map);
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
			if (data.props.data.bike) {
				let coordinates = [];
				let text = '';
				let bikeIcon = {};

				for (let key in data.props.data.bike) {
					coordinates = data.props.data.bike[key].position.split(', ');
					coordinates = coordinates.map((x) => parseFloat(x));
					text = `Cykel ${data.props.data.bike[key].id} (${data.props.data.bike[key].battery}%, ${data.props.data.bike[key].state})`;

					if (data.props.data.bike[key].state === 'available') {
						bikeIcon = new L.Icon({
							iconUrl:
								'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
							shadowUrl:
								'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
						});
					} else if (data.props.data.bike[key].state === 'occupied') {
						bikeIcon = new L.Icon({
							iconUrl:
								'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
							shadowUrl:
								'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
						});
					} else {
						bikeIcon = new L.Icon({
							iconUrl:
								'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
							shadowUrl:
								'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41]
						});
					}

					L.marker(coordinates, { icon: bikeIcon }).addTo(bikeLayer).bindPopup(text);
				}
			}
		} else {
			bikeLayer.clearLayers();
		}
	}

	function toggleParking() {
		showParkings = !showParkings;

		if (showParkings) {
			let parkingIcon = L.icon({
				iconUrl: '/parking-area.png',
				iconSize: [30, 35]
			});
			if (data.props.data.parking) {
				let coordinates = [];
				let text = '';

				for (let key in data.props.data.parking) {
					coordinates = data.props.data.parking[key].center.split(', ');
					text = `${data.props.data.parking[key].name} (${data.props.data.parking[key].number_of_chargers} laddare)`;
					L.marker([coordinates[0], coordinates[1]], { icon: parkingIcon })
						.addTo(parkingLayer)
						.bindPopup(text);
					L.circle([coordinates[0], coordinates[1]], data.props.data.parking[key].radius, {
						stroke: false,
						color: 'orange'
					}).addTo(parkingLayer);
				}
			}
		} else {
			parkingLayer.clearLayers();
		}
	}

	function zoomIn(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const latLon = formData.get('lat_lon');
		let coordinates = latLon.split(', ');

		coordinates = coordinates.map((x) => parseFloat(x));
		map.flyTo(coordinates, 14);
	}
</script>

<form class="submit-form-online" on:submit={zoomIn}>
	<label>
		Zoom
		<input name="lat_lon" type="text" placeholder="lat, lon" required />
	</label>
	<input type="submit" value="Ta mig dit" />
</form>

<div class="box-oneline">
	<label>
		<input type="checkbox" on:click={toggleBikes} />
		cyklar
	</label>
	<label>
		<input type="checkbox" on:click={toggleParking} />
		parkeringar
	</label>
</div>

<div class="map" bind:this={mapElement} />
<div>
	<a
		href="https://www.flaticon.com/free-icon/parking-area_4979378?related_id=4979378"
		target="”_blank”"
		title="parking icons">Parking icons created by ono_tono - Flaticon</a
	>
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	.map {
		height: 500px;
	}

	.box-oneline {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
</style>
