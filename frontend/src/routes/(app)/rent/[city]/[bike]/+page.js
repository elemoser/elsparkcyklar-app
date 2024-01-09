export const load = async ({ params, fetch }) => {
	const cityId = params.city;
	const bikeId = params.bike;

	const bike = async () => {
		const bikeRes = await fetch(`http://localhost:1338/v1/bikes/id/${bikeId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
		const bike = await bikeRes.json();
		return bike.bike;
	};

	const parkings = async () => {
		const parkingRes = await fetch(`http://localhost:1338/v1/parking`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
		const parkings = await parkingRes.json();
		return parkings.parking;
	};

	return {
		cityId: cityId,
		bike: bike(),
		parkings: parkings()
	};
};
