import { fail, redirect } from '@sveltejs/kit';

export const prerender = false;
export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const id = data.get('id');

		const response = await fetch(`http://server:1338/v1/users/id/${id}`);
		const res = await response.json();

		if (res.error) {
			return fail(422, {
				error: 'No such ID'
			});
		}

		cookies.set('user', res.user.id, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 10 //10 days
		});

		throw redirect(302, '/profile');
	},
	register: async ({ request, cookies }) => {
		const data = await request.formData();
		const userObj = {
			id: data.get('id'),
			first_name: data.get('fname'),
			last_name: data.get('lname'),
			phone: data.get('phone'),
			mail: data.get('email')
		};

		const response = await fetch('http://server:1338/v1/users', {
			method: 'POST',
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

		cookies.set('user', res.user.id, {
			path: '/',
			secure: true,
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 10 //10 days
		});

		throw redirect(302, '/profile');
	}
};
