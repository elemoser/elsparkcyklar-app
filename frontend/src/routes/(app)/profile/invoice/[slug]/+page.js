export const load = async ({ params, fetch }) => {
	const { slug } = params;
	const userInvoice = async () => {
		const userId = 117276057; //TODO Fix ID.
		const response = await fetch(`http://localhost:1338/v1/users/invoice/${userId}/${slug}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();
		return res.user;
	};

	return {
		invoice: userInvoice()
	};
};

//TODO Add action for payment.
