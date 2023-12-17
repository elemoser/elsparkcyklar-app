import { redirect } from '@sveltejs/kit';

export const prerender = false;
export const actions = {
	logout: async ({ cookies }) => {
		cookies.delete('passport'); //Easier to remove cookie from server side.

		throw redirect(302, '/'); //'/' to just show that the layout.server works (will redirect to /login)
	}
};
