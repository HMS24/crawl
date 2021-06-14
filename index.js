
const puppeteer = require('puppeteer');
const {
	createDirectoryIfNotExisted,
	deleteFiles,
	writeFile,
} = require('./lib/fs');
const {
	scroll,

	BROWSER_OPTION,
	NAVIGATION_OPTION,
	VIEWPORT_OPTION,
} = require('./lib/page');
const {
	crawl,
	crawlDetail,
	getTotalRows,
	generateNextPageURL,
	formatCrawledHouses,

	BASE_URL,
	ROWS_PER_PAGE,
} = require('./lib/house-sale-websites/591');

const OUT_DIR = 'output/test';
const OUT_FILE = `./${OUT_DIR}/crawl.json`;

(async () => {
	try {
		const browser = await puppeteer.launch(BROWSER_OPTION);
		const page = await browser.newPage();

		await page.setViewport(VIEWPORT_OPTION);
		await page.goto(BASE_URL, NAVIGATION_OPTION);
		await page.click('#app');

		const totalRows = await getTotalRows(page);
		const paginationNum = parseInt(Math.ceil(totalRows / ROWS_PER_PAGE));
		const results = [];

		for (let currentPage = 1; currentPage <= paginationNum; currentPage++) {
			if (currentPage > 1) {
				const offset = (currentPage - 1) * ROWS_PER_PAGE;
				const nextPage = generateNextPageURL({
					baseURL: BASE_URL,
					firstRow: offset,
					totalRows,
				});

				await page.goto(nextPage, NAVIGATION_OPTION);
			}

			await scroll(page);

			const houses = await crawl(page);

			for (let i = 0, { length } = houses; i < length; i++) {
				const { href: detailURL } = houses[i];

				await page.goto(detailURL, NAVIGATION_OPTION);

				const details = await crawlDetail(page);

				Object.assign(houses[i], details);
			}

			results.push(...formatCrawledHouses(houses));
		}

		createDirectoryIfNotExisted(OUT_DIR);

		await deleteFiles([`${OUT_DIR}/*`]);
		await writeFile(OUT_FILE, JSON.stringify(results, null, '\t'));

		await browser.close();
	} catch (error) {
		console.log(error);
	}
})();
