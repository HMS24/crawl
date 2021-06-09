module.exports = function(page) {
	return page.evaluate(async () => {
		const SCROLL_COUNT = 3;
		const DELAY_MILLISECOND = 1000;
		const scrollHeight = document.body.scrollHeight;
		const scrollHeightOffset = Math.ceil(scrollHeight / SCROLL_COUNT);

		for (let i = 0; i < SCROLL_COUNT; i++) {
			const top = (i + 1) * scrollHeightOffset;

			window.scrollTo({
				top,
				behavior: 'smooth',
			});

			await new Promise(resolve => setTimeout(resolve, DELAY_MILLISECOND));
		}
	});
};
