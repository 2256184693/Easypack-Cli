const path = require('path');

module.exports = (req) => {
  var url = req.url.replace('__easy__', '');

  req.res.set('Access-Control-Allow-Origin', '*');

  req.res.sendFile(path.join(__dirname, '../', url), err => {
    if(err) {
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  });
};
