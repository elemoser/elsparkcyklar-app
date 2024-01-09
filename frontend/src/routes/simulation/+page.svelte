<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let eventSource;
	let simulation = false;
	let L;
	let mapElement;
	let map;
	let markerLayer;

	onMount(async () => {
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

	function newEventSource(num_trips, sim_speed) {
		// Get data via SSE
		eventSource = new EventSource(`http://localhost:1338/v1/simulate/${num_trips}/${sim_speed}`);
	}

	function startSimulation(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const number_of_bikes = formData.get('number_of_bikes');
		const simulation_speed = formData.get('simulation_speed');

		// Remove markers from map if any
		markerLayer.clearLayers();

		startUpdates(number_of_bikes, simulation_speed);
	}

	function startUpdates(num_of_trips, sim_speed) {
		// Start EventSource
		if (!eventSource || eventSource.readyState === 2) {
			newEventSource(num_of_trips, sim_speed);
			console.log('Sim started');
		}

		let data = {};
		let simulationDone = false;
		let marker;
		let markers = {};
		let lat = 0;
		let lon = 0;
		let text = '';
		let greenIcon = new L.Icon({
			iconUrl:
				'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});
		let yellowIcon = new L.Icon({
			iconUrl:
				'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
			shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41]
		});
		//NOTE should we add disable bikes as well that don't move?
		// let redIcon = new L.Icon({
		// 	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		// 	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		// 	iconSize: [25, 41],
		// 	iconAnchor: [12, 41],
		// 	popupAnchor: [1, -34],
		// 	shadowSize: [41, 41]
		// });

		// Function triggered at each eventSource message
		eventSource.onmessage = function (event) {
			simulation = true;
			data = JSON.parse(event.data);
			simulationDone = data['simulationDone'] ? data['simulationDone'] : false;

			if (simulationDone) {
				stopUpdates();
			} else {
				console.log(data);
				for (let key in data) {
					lat = parseFloat(data[key].lat);
					lon = parseFloat(data[key].lon);
					text = `Cykel ${data[key].id}`;

					if (markers[key]) {
						marker = markers[key];

						// If trip finished change icon color
						if (data[key].finished) {
							marker.setIcon(yellowIcon);
						}

						// Update coordinates
						marker.setLatLng([lat, lon]);
					} else {
						marker = L.marker([lat, lon], { icon: greenIcon }).bindPopup(text).addTo(markerLayer);
						markers[key] = marker;
					}
				}
			}
		};
	}

	function stopUpdates() {
		console.log('Sim stopped');
		if (eventSource) {
			eventSource.close();
			simulation = false;
		}
	}

	onDestroy(async () => {
		if (map) {
			// console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<h1>Simulation</h1>
<div class="sim-form">
	<form class="submit-form-online" on:submit={startSimulation}>
		<label>
			Antal cycklar (min=1, max=2000)
			<input name="number_of_bikes" type="number" min="1" max="2000" required />
		</label>
		<label>
			Simuleringshastighet i sekunder (min=1, max=10)
			<input name="simulation_speed" type="number" min="1" max="10" required />
		</label>
		{#if !simulation}
			<input type="submit" value="Start" disabled={simulation} />
		{:else}
			<button on:click={stopUpdates}>Stop</button>
		{/if}
	</form>
</div>

<div class="map" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
	.map {
		height: 500px;
	}

	/* .leaflet-marker-pane > * {
		-webkit-transition: transform .1s linear;
		-moz-transition: transform .1s linear;
		-o-transition: transform .1s linear;
		-ms-transition: transform .1s linear;
		transition: all .1s ease;
	} */

	.sim-form {
		display: flex;
		flex-direction: row;
		gap: rem;
		margin-bottom: 0.9rem;
		font-family: sans-serif;
	}

	button,
	input[type='submit'] {
		background: #ff4742;
		border: 1px solid #ff4742;
		border-radius: 6px;
		box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
		box-sizing: border-box;
		color: #ffffff;
		cursor: pointer;
		display: inline-block;
		font-family: sans-serif;
		font-size: 16px;
		font-weight: 800;
		line-height: 16px;
		min-height: 40px;
		outline: 0;
		padding: 12px 14px;
		text-align: center;
		text-rendering: geometricprecision;
		text-transform: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		vertical-align: middle;
	}
	button:hover,
	button:active,
	input:hover[type='submit'],
	input:active[type='submit'] {
		background-color: initial;
		background-position: 0 0;
		color: #ff4742;
	}

	button:active,
	input:active[type='submit'] {
		opacity: 0.5;
	}

	input:disabled[type='submit'] {
		background-color: grey;
		color: black;
		border-color: darkgrey;
		opacity: 1;
		cursor: not-allowed;
	}
</style>
