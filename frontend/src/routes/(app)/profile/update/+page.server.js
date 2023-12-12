import { fail, redirect } from '@sveltejs/kit';

export const prerender = false;
export const load = async ({ cookies }) => {
	const userData = async () => {
		const userId = cookies.get('user');
		const response = await fetch(`http://server:1338/v1/users/id/${userId}`);
		const res = await response.json();

		return res.user;
	};

	return {
		user: userData()
	};
};

export const actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const userId = data.get('id');

		//Things the user can change.
		const userObj = {
			first_name: data.get('fname'),
			last_name: data.get('lname'),
			phone: data.get('phone'),
			mail: data.get('email')
		};

		const response = await fetch(`http://server:1338/v1/users/id/${userId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userObj)
		});

		const res = await response.json();

		if (res.error) {
			return fail(422, {
				error: 'Something went wrong.'
			});
		}

		throw redirect(302, '/profile');
	}
};
