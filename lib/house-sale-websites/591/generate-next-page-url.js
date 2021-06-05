module.exports = function({
	baseURL,
	firstRow,
	totalRows,
}) {
	return `${baseURL}&firstRow=${firstRow}&totalRows=${totalRows}`;
};
