const url = require('url');

module.exports = (req, res, next) => {
  // console.log(`req.url: ${req.url}`);
  // console.log(`req.baseUrl: ${req.baseUrl}`);
  // console.log(`req.path: ${req.path}`);
  // console.log(`req.originalUrl: ${req.originalUrl}`);

  var targetUrl = url.parse(req.originalUrl).path;
  // TODO:
  next();
}
