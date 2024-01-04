import { redirect } from '@sveltejs/kit';
export const load = async ({ cookies }) => {
	const userPassport = cookies.get('passport');
	if (!userPassport || userPassport === null || userPassport === undefined) {
		throw redirect(302, '/login');
	}
};
