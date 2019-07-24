const path = require('path');

module.exports = req => {
  let url = req.url.replace('__easy__', '');
  req.res.set('Access-Control-Allow-Origin', '*');
  req.res.sendFile(path.join(__dirname, '../', url), e => {
    if(e) {
      req.res.statusCode.statusCode = 404;
      req.res.end('404 Not Found!');
    }
  })
}
