const fs = require('fs');

module.exports = function(path) {
	path.split('/').reduce((parentPath, dirName) => {
		const currentPath = parentPath + dirName;

		if (!fs.existsSync(currentPath)) {
			fs.mkdirSync(currentPath);
		}

		return currentPath + '/';
	}, '');
};
