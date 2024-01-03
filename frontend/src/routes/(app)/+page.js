// Load function for client map view
export async function load({ fetch }) {
	let data = {};
	try {
		const responseBikes = await fetch(`http://localhost:1338/v1/bikes`, {
			method: 'GET',
			credentials: 'include'
		});

		if (responseBikes.status == '200') {
			const bike = await responseBikes.json();
			data['bike'] = bike.bike;
		} else {
			data['error'] = responseBikes.statusText;
		}

		const responseCities = await fetch(`http://localhost:1338/v1/city`, {
			method: 'GET',
			credentials: 'include'
		});

		if (responseCities.status == '200') {
			const city = await responseCities.json();
			data['city'] = city.city;
		} else {
			data['error'] = responseCities.statusText;
		}

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

		return { props: { data } };
	} catch (error) {
		console.error('Fetch error:', error.message);
		data['error'] = error.message;

		return { props: { data } };
	}
}
