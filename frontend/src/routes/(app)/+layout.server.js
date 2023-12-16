import { redirect } from '@sveltejs/kit';

//TODO Should probably include 'admin' under (app)

export const load = async ({ cookies }) => {
	const userPassport = cookies.get('passport');
	if (!userPassport || userPassport === null || userPassport === undefined) {
		throw redirect(302, '/login');
	}
};
