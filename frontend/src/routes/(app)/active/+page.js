import { getUser, updateUser } from '$lib/stores/user.js';
export const load = async ({ fetch, parent }) => {
	await parent();
	let userData = getUser();
	const active = async () => {
		const response = await fetch(`http://localhost:1338/v1/booking/ongoing`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
		const res = await response.json();

		if (res.booking) {
			res.booking = res.booking.find((e) => e.user_id === parseInt(userData.id));

			const bikeRes = await fetch(`http://localhost:1338/v1/bikes/id/${res.booking.bike_id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});
			const bike = await bikeRes.json();

			updateUser({ active: true });
			return { booking: res.booking, bike: bike.bike };
		}

		return undefined;
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
		active: active(),
		parkings: parkings()
	};
};
