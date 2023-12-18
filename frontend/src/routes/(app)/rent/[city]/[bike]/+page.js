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

	return {
		cityId: cityId,
		bike: bike()
	};
};

/*
export const actions = {
	rent: async ({ params, fetch }) => {
		const userId = 117276057;

		const bookingObj = {
			bike_id: params.bike,
			user_id: userId
		};

		const response = await fetch(`http://localhost:1338/v1/booking`, {
			method: 'POST',
            credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(bookingObj)
		});

		const res = await response.json();

		if (res.error) {
			return fail(422, {
				error: 'Something went wrong.'
			});
		}

		throw redirect(302, '/active');
	}
};
*/
