export const load = async ({ params }) => {
	const cityId = params.city;

	const bikes = async () => {
		const bikesRes = await fetch(`http://server:1338/v1/bikes/available/${cityId}`);
		const bikes = await bikesRes.json();
		return bikes;
	};

	return {
		cityId: cityId,
		bikes: bikes()
	};
};
