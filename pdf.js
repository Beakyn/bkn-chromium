const { parse } = require("url");
const { getPDF } = require("./chromium-pdf");
const { getInt, getUrlFromPath, isValidUrl } = require("./validator");

module.exports = async (req, res) => {
  try {
    const { pathname = "/", query = {} } = parse(req.url, true);
    const url = getUrlFromPath(pathname);
    const date = new Date()
      .toISOString()
      .split(".")[0]
      .replace(/:/g, "-");
      
    const finalUrl = req.url.substring(1);
    const fileName = query['$filename'] || `snapshot-${date}.pdf`;
    const targetCount = parseInt(query['$targetCount']) || 10000;

    if (!isValidUrl(url)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`
      );
    } else {
      const file = await getPDF(finalUrl, targetCount);

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${fileName}.pdf`
      );
      res.end(file);
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");

    console.error(error.message);
  }
};
