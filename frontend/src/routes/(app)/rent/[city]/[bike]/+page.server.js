export const load = async ({ params }) => {
    const cityId = params.city;
    const bikeId = params.bike;

	const bike = async () => {
		const bikeRes = await fetch(`http://server:1338/v1/bikes/id/${bikeId}`);
		const bike = await bikeRes.json();
		return bike.bike;
	};

	return {
        cityId: cityId,
		bike: bike(),
	};
};