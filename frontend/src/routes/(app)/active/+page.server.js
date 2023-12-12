import { redirect } from '@sveltejs/kit';
export const prerender = false;

//Could probably refactor getting booking to minimize code.

export const load = async ({ cookies }) => {
	const active = async () => {
		const userId = cookies.get('user');

		const response = await fetch(`http://server:1338/v1/booking/ongoing`);
		const res = await response.json();

		if (res.booking) {
			res.booking = res.booking.find((e) => e.user_id === parseInt(userId));
		}

		return res.booking;
	};

	return {
		active: active()
	};
};

export const actions = {
	stop: async ({ cookies }) => {
		const userId = cookies.get('user');

		const response = await fetch(`http://server:1338/v1/booking/ongoing`);
		const res = await response.json();

		const activeBooking = res.booking.find((e) => e.user_id === parseInt(userId));

		const endResponse = await fetch(`http://server:1338/v1/booking/id/${activeBooking.id}`, {
			method: 'PUT'
		});

		if (endResponse.status === 200) {
			throw redirect(302, '/profile/invoice');
		}
	}
};
