module.exports = function (page) {
	return page.evaluate(() => {
		const agent = document.querySelector('.info-span-name').textContent;
		const agency = document.querySelector('.info-host-detail').innerText;

		const houseInfoKeyElements = [...document.querySelectorAll('.info-addr-key')];
		const orientationKeyElement = houseInfoKeyElements.find(e => e.textContent === '朝向');
		const orientation = orientationKeyElement === undefined ? null : orientationKeyElement.parentElement.querySelector('.info-addr-value').textContent;

		const houseDetailKeyElements = [...document.querySelectorAll('.detail-house-key')];

		const {
			parkingSpaceElement,
			publicAreaRatioElement,
		} = houseDetailKeyElements.reduce((accumulator, current) => {
			if (current.textContent === '車位') {
				accumulator['parkingSpaceElement'] = current.parentElement;
			}

			if (current.textContent === '公設比') {
				accumulator['publicAreaRatioElement'] = current.parentElement;
			}

			return accumulator;
		}, {
			parkingSpaceElement: null,
			publicAreaRatioElement: null,
		});

		const parkingSpace = parkingSpaceElement && parkingSpaceElement.querySelector('.detail-house-value').textContent;
		const publicAreaRatio = publicAreaRatioElement && publicAreaRatioElement.querySelector('.detail-house-value').textContent;

		return {
			agent, agency,
			orientation, parkingSpace, publicAreaRatio,
		};
	});};
