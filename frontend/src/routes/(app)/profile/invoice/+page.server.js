export const load = async ({cookies}) => {
	const userInvoice = async () => {
        const userId = cookies.get('user');
		const response = await fetch(`http://server:1338/v1/users/invoice/${userId}`);
		const res = await response.json();

		return res.user;
	};

	return {
		invoices: userInvoice()
	};
};
