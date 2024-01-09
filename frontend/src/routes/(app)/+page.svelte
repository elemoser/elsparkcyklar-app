<script>
	import { app_name } from '$lib/index.js';
	import LeafletMap from '$lib/components/LeafletMap.svelte';

	export let data;
	let mapData = {};
	let markers = {};

	// console.log(data);

	if (data.props.data.city) {
		// let coordinates = {
		// 	'Stockholm': [59.33162613348961, 18.059533509723824],
		// 	'Göteborg': [57.70868974287468, 11.973281840471834],
		// 	'Malmö': [55.60918807358974, 12.999944155710187],
		// 	'Uppsala': [59.85941744625346, 17.646028891244743],
		// 	'Linkköping': [58.41728337730127, 15.626379115392396]
		// }
		let cities = data.props.data.city;
		let polygons = {};

		for (let key in cities) {
			polygons[key] = {
				text: cities[key].name,
				coordinates: cities[key].bounds
			};
		}

		mapData['polygon'] = polygons;
	}

	if (data.props.data.parking) {
		let parking = data.props.data.parking;

		for (let key in parking) {
			markers[key] = {
				text: `${parking[key].name} (${parking[key].number_of_chargers} laddare)`,
				coordinates: parking[key].center.split(', '),
				radius: parking[key].radius
			};
		}
	}

	if (data.props.data.bike) {
		let bikes = data.props.data.bike;
		let nextKey = Math.max(...Object.keys(markers).map(Number), -1) + 1;

		for (let key in bikes) {
			if (bikes[key].state === 'available') {
				markers[nextKey] = {
					text: `Bike ${bikes[key].id} (battery level: ${Math.round(bikes[key].battery)}%, ${bikes[key].state})`,
					coordinates: bikes[key].position.split(', '),
					state: bikes[key].state
				};
				nextKey += 1;
			}
		}
	}

	mapData['markers'] = markers;
	// console.log(mapData);
</script>

<h3>Välkommen till {app_name} - det bästa valet för ditt elsparkcykeläventyr! 🚴‍♂️💨</h3>
<p>
	Den här webbappen är din biljett till en smidig cykelupplevelse. Låna och lämna tillbaka cykeln,
	håll koll på senaste resan och dyk ner i din reshistorik - allt på språng! Våra intelligenta
	cyklar har koll på allt - från att vara på eller av, justera hastighet, visa position, och till
	och med signalera när den behöver lite laddning. Sätt på hjälmen, dra på dig cykelhandskarna och
	låt {app_name} ta dig med på en rullande fest av elsparkcyklar!
</p>

<p>
	Letar du efter en cykel? Här finns alla tillgängliga cyklar och parkeringsplatser för dig på en
	karta 😉
</p>
<LeafletMap data={mapData} />

<p>&#169; Svenska Elsparkcyklar AB</p>
