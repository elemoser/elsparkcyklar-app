//TODO improve this search function if time allows
export function filterData(inputData, filter) {
	if (parseInt(filter) || parseInt(filter) >= 0) {
		filter = parseInt(filter);
	}

	for (let key in inputData.body) {
		if (!inputData.body[key].includes(filter)) {
			delete inputData.body[key];
			delete inputData.links[key];
		}
	}

	return inputData;
}
