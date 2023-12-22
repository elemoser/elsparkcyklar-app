import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	//Handles user not being logged in and authenticated.
	const userPassport = cookies.get('passport');
	if (!userPassport || userPassport === null || userPassport === undefined) {
		throw redirect(302, '/login');
	}
};
