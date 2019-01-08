const {parse} = require('url');
const {getPDF} = require('./chromium-pdf');
const {getInt, getUrlFromPath, isValidUrl} = require('./validator');

module.exports = async (req, res) => {
  try {
    const {pathname = '/', query = {}} = parse(req.url, true);
    const url = getUrlFromPath(pathname);
    const date = new Date().toISOString().split('.')[0].replace(/:/g, '-');

    if (!isValidUrl(url)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);
    } else {
      const file = await getPDF(url);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=proposal-${date}.pdf`);
      res.end(file);
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');

    console.error(error.message);
  }
};