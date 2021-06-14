function currencyStringToInteger(value) {
	if (value === null || value === undefined) {
		return null;
	}

	return parseInt(value.split(',').join(''));
}

function areaToFloat(value) {
	if (value === null || value === undefined) {
		return null;
	}

	const prefix = '權狀';

	return parseFloat(value.split(prefix).pop());
}

function mainAreaToFloat(value) {
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
	if (value === null || value === undefined) {
		return null;
	}

	const postMillisecond = Number(value.split('/').pop().slice(0, 10)) * 1000;

	if (Number.isNaN(postMillisecond)) {
		return null;
	}

	return new Date(postMillisecond);
}

function trimAgency(value) {
	if (value === null || value === undefined) {
		return null;
	}

	const prefixIndex = value.indexOf('：');
	const suffixIndex = value.indexOf('\n');

	if (prefixIndex === -1) {
		return '屋主';
	}

	return value.slice(prefixIndex + 1, suffixIndex);
}

function getSitAndFaceOrientation(value) {
	const result = {
		sit: null,
		face: null,
	};

	if (value === null || value === undefined) {
		return result;
	}

	const suffixIndex = value.indexOf('朝');

	if (suffixIndex === -1) {
		return result;
	}

	result.sit = value.slice(1, suffixIndex);
	result.face = value.slice(suffixIndex + 1);

	return result;
}

function toInteger(value) {
	if (value === null || value === undefined) {
		return null;
	}

	return parseInt(value);
}

function toFloat(value) {
	if (value === null || value === undefined) {
		return null;
	}

	return parseFloat(value);
}

module.exports = function (houses) {
	return houses.map(house => {
		const { floor, totalFloor } = getFloorAndTotalFloor(house.floor);
		const { rooms, restaurants, bathRooms } = getLayoutRooms(house.layout);
		const { sit, face } = getSitAndFaceOrientation(house.orientation);

		return {
			...house,
			price: currencyStringToInteger(house.price),
			houseAge: toInteger(house.houseAge),
			area: areaToFloat(house.area),
			mainArea: mainAreaToFloat(house.mainArea),
			section: trimEndSection(house.section),
			hasParkingSpace: hasSpecificTag(house.tags, '含車位'),
			postDateTime: getPostDateTime(house.thumbURL),
			agency: trimAgency(house.agency),
			parkingSpace: toFloat(house.parkingSpace),
			publicAreaRatio: toInteger(house.publicAreaRatio),
			detailURL: house.href,
			floor,
			totalFloor,
			rooms,
			restaurants,
			bathRooms,
			sit,
			face,
		};
	});
};
