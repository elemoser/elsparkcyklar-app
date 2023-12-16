export async function load({ fetch }) {
	// Get all users from the API
	const response = await fetch(`http://localhost:1338/v1/bikes`, {
		method: 'GET',
		credentials: 'include'
	});
	const data = await response.json();
	return { props: { data } };
}
