export const load = async () => {
	const allCities = async () => {
		const citiesRes = await fetch('http://server:1338/v1/city');
		const cities = await citiesRes.json();
		return cities;
	};

	return {
		cities: allCities(),
	};
};
