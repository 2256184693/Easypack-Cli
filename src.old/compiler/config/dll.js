/**
 * EasyProject Dll配置
 *
 * Created By SH
 */

const _ = require('lodash');

const path = require('path');

const Base = require('./base.js');

const devConfig = require('./dll.dev.js');

const prdConfig = require('./dll.prd.js');

const webpackMerge = require('webpack-merge');

const V = require('../../utils/const.js');

const createCssLoader = require('../utils/cssLoader.js');

const pluginFactory = require('../utils/pluginFactory.js');

class EasyDll extends Base {
  constructor(easyConfig, workspace, env) {
    super(easyConfig, workspace, env);
    this.config.plugins = []; // 清空继承自base的plugin

    this.setDllConfig();
    this.setEntry();
    this.mergeEnvConfig();
    this.init();
  }

  setDllConfig() {
    let output = this.config.output || {};
    let outputPath = output.path || this._outPutPath();
    this.dll = {
      manifest: V.DEFAULT_DLL_MANIFEST_PATH,
      manifestPath: path.join(outputPath, V.DEFAULT_DLL_MANIFEST_PATH),
      dllFilePath : V.DEFAULT_DLL_FILES_PATH,
    };
  }
  // dll入口
  setEntry() {
    this.config.entry = this.easyConfig.library;
  }

  init() {
    this.setOutput();
    this.setCssLoaders();
    this.setResolve();
    this.setResolveLoaders();
    this.setPlugins();
  }

  mergeDevConfig() {
    let customConfig, defaultConfig;
    if(_.isFunction(this.easyConfig._devDllConfig)) {
      customConfig = this.easyConfig._devDllConfig(workspace, this.easyConfig, this.dll);
    }
    defaultConfig = devConfig(this.workspace, this.easyConfig, this.dll);
    this.config = webpackMerge(defaultConfig, this.config, customConfig);
  }

  mergePrdConfig() {
    let customConfig, defaultConfig;
    if(_.isFunction(this.easyConfig._prdDllConfig)) {
      customConfig = this.easyConfig._prdDllConfig(workspace, this.easyConfig, this.dll);
    }
    defaultConfig = prdConfig(this.workspace, this.easyConfig, this.dll);
    this.config = webpackMerge(defaultConfig, this.config, customConfig);
  }

  setOutput() {
    let output = this.config.output || {};
    if(!output.path) {
      output.path = this._outPutPath();
    }
    if(!output.filename) {
      output.filename = this._outPutFileName();
    }
    if(!output.publicPath) {
      output.publicPath = this._outputPublicPath();
    }
    if(!output.publicPath) {
      output.library = V.DEFAULT_DLL_CHUNK_NAME;
    }
    this.config.output = output;
  }

  // setResolve() {}

  // setResolveLoaders() {}

  setCssLoaders() {
    let rules = this.config.module.rules || [];
    let opt = this.easyConfig.cssLoader || {};
    const loaders = createCssLoader(_.merge({}, opt, {
      vue: this.easyConfig.vue
    }));
    this.config.module.rules = rules.concat(loaders);
  }

  setPlugins() {
    // 存储生成的dll映射。在项目打包的html-webpack-plugin中增加chunk依赖
    this.config.plugins.push(pluginFactory.dllManifestPlugin({
      filename: this.dll.dllFilePath,
    }));
  }
  getCacheData() {
    let data = _.merge({}, this.dll);
    data.libraryString = JSON.stringify(this.easyConfig.library);
    return data;
  }
}

module.exports = EasyDll;
