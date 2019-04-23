const webpack = require('webpack');

const EasyProjectPack = require('./webpack/config/project.js');

function createWebpackInstance(projectConfig, workspace, env) {
  return new Promise(function(resolve, reject) {
    try {
      let project = new EasyProjectPack(projectConfig, workspace, env);
      let webpackConfig = project.getConfig();
      let compiler = webpack(webpackConfig);
      if(__easy__.fs) {
        compiler.outputFileSystem = __easy__.fs;
      }
      resolve({
        compiler: compiler,
        config: webpackConfig,
      });
    } catch (e) {
      reject(e);
    }
  })
}


module.exports = {
  createWebpackInstance: createWebpackInstance,
};
