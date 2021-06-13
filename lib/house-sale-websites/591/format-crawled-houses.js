function currencyStringToNumber(value) {
	if (value === null || value === undefined) {
		return null;
	}

	return parseInt(value.split(',').join(''));
}

function houseAgeToNumber(value) {
	if (value === null || value === undefined) {
		return null;
	}

	return parseInt(value);
}

function getFloorAndTotalFloor(value) {
	if (value === null || value === undefined) {
		return {
			floor: null,
			totalFloor: null,
		};
	}

	const [floor, totalFloor] = value.split('/').map(e => parseInt(e, 10));

	return { floor, totalFloor };
}

module.exports = function (houses) {
	return houses.map(house => {
		const { floor, totalFloor } = getFloorAndTotalFloor(house.floor);

		return {
			...house,
			price: currencyStringToNumber(house.price),
			houseAge: houseAgeToNumber(house.houseAge),
			floor,
			totalFloor,
		};
	});
};
