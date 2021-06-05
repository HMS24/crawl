
const puppeteer = require('puppeteer');
const {
	createDirectoryIfNotExisted,
	deleteFiles,
	writeFile,
} = require('./lib/fs');

const BROWSER_OPTIONS = {
	headless: false,
};
const NAVIGATION_OPTIONS = {
	waitUntil: 'networkidle2',
};
const VIEWPORT = {
	width: 1440,
	height: 768,
};
const LIMIT = 30;
const OUT_DIR = 'output/test';
const OUT_FILE = `./${OUT_DIR}/crawl.json`;
const BASE_URL = 'https://sale.591.com.tw/?shType=list&regionid=3&section=50&kind=9&price=1000$_1200$&shape=2&pattern=3&area=40_50&houseage=$_10$&order=price_desc';

(async () => {
	try {
		const browser = await puppeteer.launch(BROWSER_OPTIONS);
		const page = await browser.newPage();

		await page.setViewport(VIEWPORT);
		await page.goto(BASE_URL, NAVIGATION_OPTIONS);
		await page.click('#app');

		const results = [];
		const totalRows = await page.evaluate(() => document.querySelector('.houseList-head-title em').textContent);
		const paginationNum = parseInt(Math.ceil(totalRows / LIMIT));

		for (let currentPage = 1; currentPage <= paginationNum; currentPage++) {
			if (currentPage > 1) {
				const offset = (currentPage - 1) * LIMIT;

				await page.goto(`${BASE_URL}&firstRow=${offset}&totalRows=${totalRows}`, NAVIGATION_OPTIONS);
			}

			await page.evaluate(async () => {
				const SCROLL_NUM = 3;
				const scrollHeight = document.body.scrollHeight;
				const scrollHeightOffset = Math.ceil(scrollHeight / SCROLL_NUM);

				for (let i = 0; i < SCROLL_NUM; i++) {
					const top = (i + 1) * scrollHeightOffset;

					window.scrollTo({
						top,
						behavior: 'smooth',
					});

					await new Promise(resolve => setTimeout(resolve, 1000));
				}
			});

			const nodes = await page.evaluate(() => {
				const nodes = [...document.querySelectorAll('.houseList-item')];

				return nodes.map(node => {
					const price = node.querySelector('.houseList-item-price em').textContent;
					const section = node.querySelector('.houseList-item-section').textContent;
					const address = node.querySelector('.houseList-item-address').textContent;

					const { src: thumbURL } = node.querySelector('.houseList-item-thumb');
					const { href, title } = node.querySelector('.houseList-item-title a');

					const communityElement = node.querySelector('.houseList-item-community') ;
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
			});

			results.push(...nodes);
		}

		results.forEach(e => e.price = dollarStringToInt(e.price));

		createDirectoryIfNotExisted(OUT_DIR);

		await deleteFiles([`${OUT_DIR}/*`]);
		await writeFile(OUT_FILE, JSON.stringify(results, null, '\t'));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
})();

function dollarStringToInt(value) {
	return parseInt(value.split(',').join(''));
}
