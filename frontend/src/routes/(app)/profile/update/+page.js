export const load = async ({ fetch }) => {
	const userData = async () => {
		const userId = 117276057; //TODO Fix ID.
		const response = await fetch(`http://localhost:1338/v1/users/id/${userId}`, {
			method: 'GET',
			credentials: 'include'
		});
		const res = await response.json();

		return res.user;
	};

	return {
		user: userData()
	};
};
