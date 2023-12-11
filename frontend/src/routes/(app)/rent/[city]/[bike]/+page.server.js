import { fail, redirect } from '@sveltejs/kit';

export const prerender = false;
export const load = async ({ params }) => {
	const cityId = params.city;
	const bikeId = params.bike;

	const bike = async () => {
		const bikeRes = await fetch(`http://server:1338/v1/bikes/id/${bikeId}`);
		const bike = await bikeRes.json();
		return bike.bike;
	};

	return {
		cityId: cityId,
		bike: bike()
	};
};

export const actions = {
	rent: async ({ cookies, params }) => {
		const userId = cookies.get('user');

		const bookingObj = {
			bike_id: params.bike,
			user_id: userId
		};

		const response = await fetch(`http://server:1338/v1/booking`, {
			method: 'POST',
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
