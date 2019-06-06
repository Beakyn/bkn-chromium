const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

const getPDF = async (url, _targetCount) => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  });

  const page = await browser.newPage();

  await page.goto(url, { timeout: 3000000 });

  await page.waitFor(15000);

  const file = await page.pdf();

  await browser.close();

  return file;
};

module.exports = { getPDF };
