import { error } from '@sveltejs/kit';
import { getUser } from '$lib/stores/user';

export const load = async ({ parent }) => {
	await parent();
	const userData = getUser();
	if (userData.role !== 'admin') {
		throw error(404, {
			message: 'You are not an admin.'
		});
	}
};
