const fs = require('fs');

module.exports = function(...args) {
	return new Promise((resolve, reject) => {
		return fs.writeFile(...args, error => {
			if (error) {
				return reject(error);
			}

			resolve();
		});
	});
};
