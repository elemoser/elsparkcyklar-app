export const load = async ({params, cookies}) => {
    const { slug } = params;
	const userInvoice = async () => {
        const userId = cookies.get('user');
		const response = await fetch(`http://server:1338/v1/users/invoice/${userId}`);
		const res = await response.json();

        //handle single object.
        if (!Array.isArray(res.user)) {
            let arr = res.user;
            res.user = [arr];
        }

        const theInvoice = res.user.find((e) => e.id === parseInt(slug) && e.user_id === parseInt(userId));
        res.user = theInvoice;

		return res.user;
	};

	return {
		invoice: userInvoice()
	};
};

//TODO Add action for payment.
