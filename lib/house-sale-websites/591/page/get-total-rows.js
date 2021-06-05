module.exports = function (page) {
	return page.evaluate(() => document.querySelector('.houseList-head-title em').textContent);
};
