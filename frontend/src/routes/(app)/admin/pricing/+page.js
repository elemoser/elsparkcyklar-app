export async function load({ fetch }) {
	// Get fees from the API
	const response = await fetch(`http://localhost:1338/v1/price`, {
		method: 'GET',
		credentials: 'include'
	});
	const data = await response.json();
	return { props: { data } };
}
