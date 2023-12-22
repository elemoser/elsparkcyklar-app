import { getUser } from '$lib/stores/user';
export const load = async ({ fetch, parent }) => {
	await parent();
	const userData = getUser();
	const userInvoice = async () => {
		const response = await fetch(`http://localhost:1338/v1/users/invoice/${userData.id}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();
		return res.user;
	};

	return {
		invoices: userInvoice()
	};
};
