const del = require('del');

module.exports = function(paths) {
	return del(paths);
};
