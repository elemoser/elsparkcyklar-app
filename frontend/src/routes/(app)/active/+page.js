export const load = async ({ fetch }) => {
	const active = async () => {
		const userId = 117276057;

		const response = await fetch(`http://localhost:1338/v1/booking/ongoing`, {
			method: 'GET',
			headers: {
				'Content-Type' : 'application/json'
			},
			credentials: 'include'
		});
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