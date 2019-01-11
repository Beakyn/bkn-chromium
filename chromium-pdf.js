const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const {
  scrapeInfiniteScrollItems
} = require("./utils/scrape-infinite-scroll-items");
const { extractItems } = require("./utils/extract-items");

const getPDF = async (url, targetCount) => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  });

  const page = await browser.newPage();

  await page.goto(url, { timeout: 0 });

  await scrapeInfiniteScrollItems(page, extractItems, targetCount, 5000);

  const file = await page.pdf();

  await browser.close();

  return file;
};

module.exports = { getPDF };
