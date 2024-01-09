// Load data for specific row in db
/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
	let data;
	let target = params.bike;

	if (target) {
		try {
			const response = await fetch(`http://localhost:1338/v1/bikes/id/${target}`, {
				method: 'GET',
				credentials: 'include'
			});
			if (response.status == '200') {
				data = await response.json();
				data = data.bike;
			} else {
				data['error'] = response.statusText;
			}
		} catch (error) {
			console.error('Fetch error:', error.message);
			data['error'] = error.message;
		}
	} else {
		// Error if the condition is not met
		data = { error: 'Invalid parameter' };
	}

	return {
		props: { data, target }
	};
}
