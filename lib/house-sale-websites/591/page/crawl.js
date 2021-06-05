module.exports = function (page) {
	return page.evaluate(() => {
		const nodes = [...document.querySelectorAll('.houseList-item')];

		return nodes.map(node => {
			const price = node.querySelector('.houseList-item-price em').textContent;
			const section = node.querySelector('.houseList-item-section').textContent;
			const address = node.querySelector('.houseList-item-address').textContent;

			const { src: thumbURL } = node.querySelector('.houseList-item-thumb');
			const { href, title } = node.querySelector('.houseList-item-title a');

			const communityElement = node.querySelector('.houseList-item-community');
			const community = communityElement === null ? null : communityElement.firstElementChild.textContent;

			const [
				shape, layout, area,
				mainArea, houseAge, floor,
			] = [...node.querySelector('.houseList-item-attr-row').children].map(node => node.textContent);

			const tags = [...node.querySelector('.houseList-item-tag-row').children].map(element => element.textContent);

			return {
				title, price, community,
				shape, layout, area,
				mainArea, houseAge, floor,
				section, address, tags,
				href, thumbURL,
			};
		});
	});};
