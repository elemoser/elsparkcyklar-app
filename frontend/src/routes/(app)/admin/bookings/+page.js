// Load function for booking view
export async function load({ fetch }) {
	let data = {};
	try {
		const responseBooking = await fetch(`http://localhost:1338/v1/booking`, {
			method: 'GET',
			credentials: 'include'
		});

		if (responseBooking.status == '200') {
			const bookings = await responseBooking.json();
			data['bookings'] = bookings.booking;
		} else {
			data['error'] = responseBooking.statusText;
		}

		const response = await fetch(`http://localhost:1338/v1/booking/ongoing`, {
			method: 'GET',
			credentials: 'include'
		});

		if (response.status == '200') {
			const ongoingBookings = await response.json();
			data['ongoingBookings'] = ongoingBookings.booking;
		} else {
			data['error'] = response.statusText;
		}

		return { props: { data } };
	} catch (error) {
		console.error('Fetch error:', error.message);
		data['error'] = error.message;

		return { props: { data } };
	}
}
