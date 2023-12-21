// Load data for specific row in db
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	let data = {};
	let target = params.user;

	if (target) {
		try {
			const response = await fetch(`http://localhost:1338/v1/users/id/${target}`, {
				method: 'GET',
				credentials: 'include'
			});

			if (response.status == '200') {
				let userData = await response.json();
				data['user'] = userData.user;
			} else {
				data['error'] = response.statusText;
			}

			//TODO show bookings and invoices
			
		} catch (error) {
			console.error('Fetch error:', error.message);
			data['error'] = response.statusText;
		}
	} else {
		// Error if the condition is not met
		data['error'] = 'Invalid parameter';
	}

	return {
		props: { data, target }
	};
}
