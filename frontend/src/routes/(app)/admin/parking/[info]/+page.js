// Load data for specific row in db
/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
	let data = {};
	let target = params.info;

	if (target) {
		try {
			const response = await fetch(`http://localhost:1338/v1/parking/id/${target}`, {
				method: 'GET',
				credentials: 'include'
			});
			if (response.status == '200') {
				let parking = await response.json();
				data['parking'] = parking.parking;
			} else {
				data['error'] = response.statusText;
			}

			const responseCharger = await fetch(`http://localhost:1338/v1/charger`, {
				method: 'GET',
				credentials: 'include'
			});
			if (responseCharger.status == '200') {
				let chargers = await responseCharger.json();
				data['chargers'] = chargers.chargers;
			} else {
				data['error'] = responseCharger.statusText;
			}
		} catch (error) {
			console.error('Fetch error:', error.message);
			data['error'] = error.message;
		}
	} else {
		// Error if the condition is not met
		data['error'] = 'Invalid parameter';
	}

	return {
		props: { data, target }
	};
}
