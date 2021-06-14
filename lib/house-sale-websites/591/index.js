const crawl = require('./page/crawl');
const crawlDetail = require('./page/crawl-detail');
const getTotalRows = require('./page/get-total-rows');
const generateNextPageURL = require('./generate-next-page-url');
const formatCrawledHouses = require('./format-crawled-houses');

const BASE_URL = 'https://sale.591.com.tw/?shType=list&regionid=3&section=50&kind=9&price=1000$_1200$&shape=2&pattern=3&area=40_50&houseage=$_10$&order=price_desc';
const ROWS_PER_PAGE = 30;

module.exports = {
	crawl,
	crawlDetail,
	getTotalRows,
	generateNextPageURL,
	formatCrawledHouses,

	BASE_URL,
	ROWS_PER_PAGE,
};
