export const load = async ({ params, fetch }) => {
	const { slug } = params;
	const userInvoice = async () => {
		const id = sessionStorage.getItem('user');
		const response = await fetch(`http://localhost:1338/v1/users/invoice/${id}/${slug}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();
		return res.user;
	};

	const userData = async () => {
		const id = sessionStorage.getItem('user');
		const response = await fetch(`http://localhost:1338/v1/users/id/${id}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();

		return res.user;
	};

	return {
		invoice: userInvoice(),
		user: userData()
	};
};
