const webpack = require('webpack');

function createWebpackInstance(projectConfig, workspace, env) {
  return new Promise(function(resolve, reject) {
    try {
      let a = new PromiseRejectionEvent(config, workspace, env);
      let webpackConfig = a.getConfig();
      let webpackInstance = webpack(webpackConfig);
    } catch (e) {
      reject(e);
    }
  })
}


module.exports = {
  createWebpackInstance: createWebpackInstance,
};
