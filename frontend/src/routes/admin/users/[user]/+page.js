// Load data for specific row in db
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	let data;
	let target = params.user;

	if (target) {
		try {
			const response = await fetch(`http://localhost:1338/v1/users/id/${target}`, {
				method: 'GET',
				credentials: 'include'
			});
			if (!response.ok) {
				throw new Error('Failed to fetch');
			}
			data = await response.json();
			data = data.user;
		} catch (error) {
			console.error('Fetch error:', error.message);
			// Error
			data = { error: error.message };
		}
	} else {
		// Error if the condition is not met
		data = { error: 'Invalid parameter' };
	}

	return {
		props: { data, target }
	};
}
