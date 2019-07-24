const webpack = require('webpack');

const fs = require('fs');

const path = require('path');

const EasyProject = require('./config/project.js');

const createCompiler = (easyConfig, workspace, env) => {
  return new Promise((resolve, reject) => {
    try {
      let project = new EasyProject(easyConfig, workspace, env);
      let webpackConfig = project.getWebpackConfig();
      // TODO: test
      fs.writeFileSync('./test.json', JSON.stringify(webpackConfig));

      let compiler = webpack(webpackConfig);
      if(__easy__.fs) {
        compiler.outputFileSystem = __easy__.fs;
      }
      resolve({
        compiler,
        config: webpackConfig,
      });
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  createCompiler,
};
