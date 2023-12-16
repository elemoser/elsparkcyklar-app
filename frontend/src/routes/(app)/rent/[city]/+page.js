export const load = async ({ params, fetch }) => {
	const cityId = params.city;

	const bikes = async () => {
		const bikesRes = await fetch(`http://localhost:1338/v1/bikes/available/${cityId}`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			},
			credentials: 'include'
		});

		const bikes = await bikesRes.json();
		return bikes;
	};

	return {
		cityId: cityId,
		bikes: bikes()
	};
};
