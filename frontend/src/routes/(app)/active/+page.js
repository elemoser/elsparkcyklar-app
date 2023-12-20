import { user } from '$lib/stores/user.js';
export const load = async ({ fetch }) => {
	let userData;
	const unsubscribe = user.subscribe(val => {
		userData = val
	});
	const active = async () => {
		const response = await fetch(`http://localhost:1338/v1/booking/ongoing`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
		const res = await response.json();

		console.log(userData);

		if (res.booking) {
			res.booking = res.booking.find((e) => e.user_id === parseInt(user.id));
		}

		unsubscribe();
		return res.booking;
	};

	return {
		active: active()
	};
};
