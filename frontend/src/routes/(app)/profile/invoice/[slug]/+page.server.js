export const load = async ({ params, cookies }) => {
	const { slug } = params;
	const userInvoice = async () => {
		const userId = cookies.get('user');
		const response = await fetch(`http://server:1338/v1/users/invoice/${userId}/${slug}`);
		const res = await response.json();

		return res.user;
	};

	return {
		invoice: userInvoice()
	};
};

//TODO Add action for payment.
