import { getUser } from '$lib/stores/user';
export const load = async ({ params, fetch, parent }) => {
	const { slug } = params;
	await parent();
	const userData = getUser();
	const userInvoice = async () => {
		const response = await fetch(`http://localhost:1338/v1/users/invoice/${userData.id}/${slug}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();
		return res.user;
	};

	return {
		invoice: userInvoice(),
		user: userData
	};
};
