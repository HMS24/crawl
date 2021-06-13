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

function areaToNumber(value) {
	if (value === null || value === undefined) {
		return null;
	}

	const prefix = '權狀';

	return parseFloat(value.split(prefix).pop());
}

function mainAreaToNumber(value) {
	if (value === null || value === undefined) {
		return null;
	}

	const prefix = '主建';

	return parseFloat(value.split(prefix).pop());
}

function trimEndSection(value) {
	if (value === null || value === undefined) {
		return null;
	}

	return value.split('-').shift();
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

function getLayoutRooms(value) {
	if (value === null || value === undefined) {
		return {
			rooms: null,
			restaurants: null,
			bathRooms: null,
		};
	}

	const [rooms, restaurants, bathRooms] = value.split('')
		.filter((e, index) => index % 2 === 0)
		.map(e => parseInt(e, 10));

	return { rooms, restaurants, bathRooms };
}

function hasSpecificTag(tags, tag) {
	const pattern = new RegExp(tag);

	return tags.some(tag => pattern.test(tag));
}

function getPostDateTime(value) {
	const postMillisecond = Number(value.split('/').pop().slice(0, 10)) * 1000;

	if (Number.isNaN(postMillisecond)) {
		return null;
	}

	return new Date(postMillisecond);
}

module.exports = function (houses) {
	return houses.map(house => {
		const { floor, totalFloor } = getFloorAndTotalFloor(house.floor);
		const { rooms, restaurants, bathRooms } = getLayoutRooms(house.layout);

		return {
			...house,
			price: currencyStringToNumber(house.price),
			houseAge: houseAgeToNumber(house.houseAge),
			area: areaToNumber(house.area),
			mainArea: mainAreaToNumber(house.mainArea),
			section: trimEndSection(house.section),
			hasParkingSpace: hasSpecificTag(house.tags, '含車位'),
			postDateTime: getPostDateTime(house.thumbURL),
			detailURL: house.href,
			floor,
			totalFloor,
			rooms,
			restaurants,
			bathRooms,
		};
	});
};
