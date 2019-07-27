const webpack = require('webpack');

const fs = require('fs');

const path = require('path');

const EasyProject = require('./config/project.js');

const EasyDll = require('./config/dll.js');

const createCompiler = (easyConfig, workspace, env) => {
  if(easyConfig.library) {
    return createCompilerWithDll(easyConfig, workspace, env);
  }
  return createBaseCompiler(easyConfig, workspace, env);
};

const createBaseCompiler = (easyConfig, workspace, env) => {
  return new Promise((resolve, reject) => {
    try {
      let easyProject = new EasyProject(easyConfig, workspace, env);
      let webpackConfig = easyProject.getWebpackConfig();

      // FIXME: test
      // fs.writeFileSync('./test.json', JSON.stringify(webpackConfig));

      let compiler = webpack(webpackConfig);
      if(__easy__.fs) {
        compiler.outputFileSystem = __easy__.fs;
      }
      resolve({
        easyProject,
        compiler,
        config: webpackConfig,
      });
    } catch (e) {
      reject(e);
    }
  })
}

const createCompilerWithDll = (easyConfig, workspace, env) => {
  return new Promise((resolve, reject) => {
    let easyDll = new EasyDll(easyConfig, workspace, env);
    let dllWebpackConfig = easyDll.getWebpackConfig();

    // FIXME: test
    // fs.writeFileSync('./test.dll.json', JSON.stringify(dllWebpackConfig));

    let dllCompiler = webpack(dllWebpackConfig);
    if(__easy__.fs) {
      dllCompiler.outputFileSystem = __easy__.fs;
    }

    dllCompiler.run((e, stats) => {
      if(e || stats.hasErrors()) {
        let info = stats.toJson();
        reject(e || info.errors);
        return;
      }
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n');
      try {
        let easyProject = new EasyProject(easyConfig, workspace, env);
        let webpackConfig = easyProject.getWebpackConfig();

        // FIXME: test
        // fs.writeFileSync('./test.json', JSON.stringify(webpackConfig));

        let compiler = webpack(webpackConfig);
        if(__easy__.fs) {
          compiler.outputFileSystem = __easy__.fs;
        }
        resolve({
          easyProject,
          compiler,
          config: webpackConfig,

          easyDll,
          dllCompiler,
          dllConfig: dllWebpackConfig,
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = {
  createCompiler,
  createBaseCompiler,
  createCompilerWithDll
};
