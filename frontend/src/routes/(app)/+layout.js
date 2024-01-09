import { setUser } from '$lib/stores/user';
export const load = async ({ fetch }) => {
	let user = {};

	try {
		//Get users ID
		const respId = await fetch('http://localhost:1338/v1/users/id', {
			method: 'GET',
			credentials: 'include'
		});

		if (!respId.ok) {
			throw new Error('Failed to get user id');
		}

		const resId = await respId.json();

		//get user Data
		const responseData = await fetch(`http://localhost:1338/v1/users/id/${resId.userId}`, {
			method: 'GET',
			credentials: 'include'
		});

		if (!responseData.ok) {
			throw new Error('Failed to get user data');
		}

		const resData = await responseData.json();

		user = resData.user;

		//get active trip for user if user has trip set user.active to true else false.
		const response = await fetch(`http://localhost:1338/v1/booking/ongoing`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
		const res = await response.json();

		const booking = res.booking.find((e) => e.user_id === parseInt(user.id));

		user.active = booking ? true : false;

		setUser(user);
	} catch (err) {
		console.error(err);
		user.err_text = `${err}`;
		user.error = true;
		setUser(user);
	}
};
