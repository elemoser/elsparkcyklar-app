import { redirect } from '@sveltejs/kit';

// Super basic login using cookie.

//TODO Should probably include 'admin' under (app)

export const load = async ({ cookies }) => {
	const userPassport = cookies.get('passport');

	if (!userPassport || userPassport === null || userPassport === undefined) {
		throw redirect(302, '/login');
	}
};
