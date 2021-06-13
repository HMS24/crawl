module.exports = function (page) {
	return page.evaluate(() => {
		const itemElements = [...document.querySelectorAll('.houseList-item')];

		return itemElements.map(element => {
			const price = element.querySelector('.houseList-item-price em').textContent;
			const section = element.querySelector('.houseList-item-section').textContent;
			const address = element.querySelector('.houseList-item-address').textContent;

			const { src: thumbURL } = element.querySelector('.houseList-item-thumb');
			const { href, title } = element.querySelector('.houseList-item-title a');

			const communityElement = element.querySelector('.houseList-item-community');
			const community = communityElement === null ? null : communityElement.firstElementChild.textContent;

			const shapeElement = element.querySelector('.houseList-item-attrs-shape');
			const layoutElement = element.querySelector('.houseList-item-attrs-layout');
			const areaElement = element.querySelector('.houseList-item-attrs-area');
			const mainAreaElement = element.querySelector('.houseList-item-attrs-mainarea');
			const houseAgeElement = element.querySelector('.houseList-item-attrs-houseage');
			const floorElement = element.querySelector('.houseList-item-attrs-floor');

			const attributeElements = [
				shapeElement, layoutElement, areaElement,
				mainAreaElement, houseAgeElement, floorElement,
			];

			const [
				shape, layout, area,
				mainArea, houseAge, floor,
			] = attributeElements.map(e => e && e.textContent);

			const tags = [...element.querySelector('.houseList-item-tag-row').children].map(element => element.textContent);

			return {
				title, price, community,
				shape, layout, area,
				mainArea, houseAge, floor,
				section, address, tags,
				href, thumbURL,
			};
		});
	});};
