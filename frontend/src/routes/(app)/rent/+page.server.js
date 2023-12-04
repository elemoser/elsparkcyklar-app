import { cities, bikes } from './data'; //TODO data är tillfällig och skall tas bort när calls för API:et är klara.

export function load() {
	return {
		res: cities.map((city) => ({
			slug: city.id,
			name: city.name,
			bounds: city.bounds
		})),
		bikes: bikes
	};
}
