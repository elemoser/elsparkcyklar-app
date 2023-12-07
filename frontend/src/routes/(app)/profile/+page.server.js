export const load = async ({cookies}) => {
	const userData = async () => {
        const userId = cookies.get('user');
		const response = await fetch(`http://server:1338/v1/users/id/${userId}`);
		const res = await response.json();

		return res.user;
	};

	return {
		user: userData()
	};
};
