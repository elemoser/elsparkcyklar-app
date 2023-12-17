export const load = async ({ fetch }) => {
	const allCities = async () => {
		const citiesRes = await fetch('http://localhost:1338/v1/city', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		const cities = await citiesRes.json();
		return cities;
	};

	return {
		cities: allCities()
	};
};
