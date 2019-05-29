const config = require('./../structure/config.js');

const webpack = require('../compiler/webpack.js');

module.exports = function (minify) {
  var startTime = Date.now();
  log.info(`EasyPack Build Start`);
  var easyConfig = config.getEasyConfig();

  promise = webpack.createWebpackInstance(easyConfig.config, __easy__.cwd, 'prd');

  promise.then(function(data) {
    var compiler = data.compiler;
    if(compiler) {
      compiler.run(function(err, stats) {
        if(err) {
          console.log('EasyPack Build Error:', err);
          var endTime = Date.now();
          log.info(`EasyPack Build End, Spend Time: ${endTime - startTime}`);
          return false;
        }
        var endTime = Date.now();
        log.success(`EasyPack Build Success, Spend Time: ${endTime - startTime}`);
      });
    }
  }).catch(e => {
    console.log('EasyPack Build Error:', e);
    var endTime = Date.now();
    log.info(`EasyPack Build End, Spend Time: ${endTime - startTime}`);
  })
}
