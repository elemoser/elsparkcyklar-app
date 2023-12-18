export const load = async ({ fetch }) => {
	const userInvoice = async () => {
		const id = sessionStorage.getItem('user');
		const response = await fetch(`http://localhost:1338/v1/users/invoice/${id}`, {
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
