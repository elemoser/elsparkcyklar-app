// Load function for booking view
export async function load({ fetch }) {
	let data = {};
	try {
		const response = await fetch(`http://localhost:1338/v1/invoice`, {
			method: 'GET',
			credentials: 'include'
		});

		if (response.status == '200') {
			const invoices = await response.json();
			data['invoices'] = invoices.invoice;
		} else {
			data['error'] = response.statusText;
		}

		return { props: { data } };
	} catch (error) {
		console.error('Fetch error:', error.message);
		data['error'] = error.message;

		return { props: { data } };
	}
}