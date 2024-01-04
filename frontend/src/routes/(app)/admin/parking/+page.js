// Load function for bike view
export async function load({ fetch }) {
	let data = {};
	try {
		const responseParking = await fetch(`http://localhost:1338/v1/parking`, {
			method: 'GET',
			credentials: 'include'
		});

		if (responseParking.status == '200') {
			const parking = await responseParking.json();
			data['parking'] = parking.parking;
		} else {
			data['error'] = responseParking.statusText;
		}

		// const responseCharger = await fetch(`http://localhost:1338/v1/charger`, {
		// 	method: 'GET',
		// 	credentials: 'include'
		// });

		// if (responseCharger.status == '200') {
		// 	const chargers = await responseCharger.json();
		// 	data['chargers'] = chargers.chargers;
		// } else {
		// 	data['error'] = responseCharger.statusText;
		// }

		return { props: { data } };
	} catch (error) {
		console.error('Fetch error:', error.message);
		data['error'] = error.message;

		return { props: { data } };
	}
}
