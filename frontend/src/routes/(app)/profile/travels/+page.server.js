export const load = async ({ cookies }) => {
	const userHistory = async () => {
		const userId = cookies.get('user');
		const response = await fetch(`http://server:1338/v1/users/history/${userId}`);
		const res = await response.json();

		return res.user;
	};

	return {
		history: userHistory()
	};
};
