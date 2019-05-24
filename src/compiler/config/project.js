/**
 * 项目配置类 继承自默认Config类
 *
 * Created By SH
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackMerge = require('webpack-merge');

const path = require('path');

const _ = require('lodash');

const ConfigFactory = require('./base.js');

const _prdDefault = require('./env/prd.js');

const _devDefault = require('./env/dev.js');

const createCssLoader = require('../utils/cssLoader.js');

class Project extends ConfigFactory {
  constructor(easyConfig, workspace, env) {
    super(easyConfig, workspace, env);
    this.setEntry();
    this.mergeEnvConfig();
    this._init();
  }

  getConfig() {
    return this.config;
  }

  setEntry() {
    // dev环境增加热更新入口
    if(this.env === 'dev') {
      let entry = this.config.entry;
      Object.keys(entry).forEach(entryKey => {
        entry[entryKey] = [path.join(__easy__.root, './src/client/client.dev.js')].concat(entry[entryKey]);
      });
    }
    return this;
  }

  mergeDevConfig() {
    var customConfig, defaultConfig;
    if(_.isFunction(this.easyConfig._dev)) {
      customConfig = this.easyConfig._dev(this.workspace, this.easyConfig);
    }
    defaultConfig = _devDefault(this.workspace, this.easyConfig);
    this.config = webpackMerge(defaultConfig, this.config, customConfig);
  }

  mergePrdConfig() {
    var customConfig, defaultConfig;
    if(_.isFunction(this.easyConfig._prd)) {
      customConfig = this.easyConfig._dev(this.workspace, this.easyConfig);
    }
    defaultConfig = _prdDefault(this.workspace, this.easyConfig);
    this.config = webpackMerge(defaultConfig, this.config, customConfig);
  }

  _init() {
    this.setResolve();
    this.setResolveLoaders();
    this.setCssLoaders();
    this.setPlugins();
    this.setEntryHtml();
  }

  setCssLoaders() {
    var rules = this.config.module.rules || [];
    var opt = this.easyConfig.cssLoader || {};

    var loaders = createCssLoader(opt, this.env);
    this.config.module.rules = rules.concat(loaders);
    return this;
  }

  setPlugins() {

  }

  setEntryHtml() {
    var easyConfig = this.easyConfig;
    var plugins = this.config.plugins;
    var entryHtml = easyConfig.entryHtml;
    if(entryHtml && entryHtml.length) {
      var _default_conf = this._isDev() ? {
        inject: true,
        chunksSortMode: 'dependency',
      } : {
        inject: true,
        chunksSortMode: 'dependency',
        minify: {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true,
        }
      };

      var commonPack = [];

      if(easyConfig.commonPack) {
        commonPack = [ typeof easyConfig.commonPack === 'boolean' ? '__common__' : easyConfig.commonPack ];
      }
      entryHtml.forEach(function(conf) {
        var _conf = Object.assign({}, _default_conf, conf);
        if(_conf.chunks && commonPack.length) {
          _conf.chunks = commonPack.concat(_conf.chunks);
        }
        plugins.push(new HtmlWebpackPlugin(_conf));
      });
    }
  }
}

module.exports = Project;
