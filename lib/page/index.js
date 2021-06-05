const scroll = require('./scroll');

const BROWSER_OPTION = {
	headless: false,
};
const NAVIGATION_OPTION = {
	waitUntil: 'networkidle2',
};
const VIEWPORT_OPTION = {
	width: 1440,
	height: 768,
};

module.exports = {
	scroll,

	BROWSER_OPTION,
	NAVIGATION_OPTION,
	VIEWPORT_OPTION,
};
