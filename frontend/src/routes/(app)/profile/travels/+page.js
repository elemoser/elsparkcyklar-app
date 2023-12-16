export const load = async ({ fetch }) => {
	const userHistory = async () => {
		const userId = 117276057; //TODO Fix ID.
		const response = await fetch(`http://localhost:1338/v1/users/history/${userId}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();
		return res.user;
	};

	return {
		history: userHistory()
	};
};
