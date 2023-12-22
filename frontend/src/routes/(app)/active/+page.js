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
			updateUser({ active: true });
		}

		return res.booking;
	};

	return {
		active: active()
	};
};
