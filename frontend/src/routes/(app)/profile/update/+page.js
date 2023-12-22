import { getUser } from '$lib/stores/user';
export const load = async ({ parent }) => {
	await parent();
	const userData = getUser();

	return {
		user: userData
	};
};
