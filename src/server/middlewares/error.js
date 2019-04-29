module.exports = function(err, req, res, next) {
  if(err && err.status && err.status != 404) {
    serverLog.error(err);
  }
  res.status(err.status || 500);
  res.send(err.message || '服务器错误');
}
