/**
 * EasyProject 项目配置类
 *
 * Created By SH
 */

const _ = require('lodash');

const path = require('path');

const BaseConfigFactory = require('./base.js');

const createCssLoader = require('../utils/cssLoader.js');

const webpackMerge = require('webpack-merge');

const devConfig = require('./project.dev.js');

const prdConfig = require('./project.prd.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

class EasyProject extends BaseConfigFactory {
  constructor(easyConfig, workspace, env) {
    super(easyConfig, workspace, env);
    this.setEntry();
    this.mergeEnvConfig();
    this.init();
  }
  init() {
    this.setOutPut();
    this.setResolve();
    this.setResolveLoaders();
    this.setCssLoaders();
    this.setPlugins();
    this.setEntryHtml();
  }
  mergeDevConfig() {
    let customConfig, defaultConfig;
    if(_.isFunction(this.easyConfig._devConfig)) {
      customConfig = this.easyConfig._devConfig(this.workspace, this.easyConfig);
    }
    defaultConfig = devConfig(this.workspace, this.easyConfig);
    this.config = webpackMerge(defaultConfig, this.config, customConfig);
  }
  mergePrdConfig() {
    let customConfig, defaultConfig;
    if(_.isFunction(this.easyConfig._prdConfig)) {
      customConfig = this.easyConfig._prdConfig(this.workspace, this.easyConfig);
    }
    defaultConfig = prdConfig(this.workspace, this.easyConfig);
    this.config = webpackMerge(defaultConfig, this.config, customConfig);
  }
  setEntry() {
    // dev环境增加热更新入口entry
    if(this.env === 'dev') {
      let entry = this.config.entry;
      Object.keys(entry).forEach(entryKey => {
        entry[entryKey] = [path.join(__easy__.root, './src/client/client.dev.js')].concat(entry[entryKey]);
      });
    }
    return this;
  }
  setOutPut() {
    var output = this.config.output || {};
    if(!output.path) {
      this.setOutPutPath();
    }
    if(!output.filename) {
      this.setOutPutFileName();
    }
    if(!output.publicPath) {
      this.setOutputPublicPath();
    }
  }
  setCssLoaders() {
    let rules = this.config.module.rules || [];
    let opt = this.easyConfig.cssLoader || {};
    const loaders = createCssLoader(opt, this.env);

    this.config.module.rules = rules.concat(loaders);
    return this;
  }
  setPlugins() {
    let plugins = this.config.plugins;
    plugins.push(new MiniCssExtractPlugin({
      filename: this._isDev() ? 'css/[name].css' : 'css/[name].[chunkhash:8].css',
      chunks: 'all',
    }));
    this.config.plugins = plugins;
  }
  setEntryHtml() {
    let entryHtmls = this.easyConfig.entryHtml;
    if(entryHtmls && entryHtmls.length) {
      let _conf = this._isDev() ? {
        inject: true,
      } : {
        inject: true,
        minify: {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        }
      };
      entryHtmls.forEach(conf => {
        this.config.plugins.push(new HtmlWebpackPlugin(Object.assign({}, _conf, conf)));
      });
    }
  }
}

module.exports = EasyProject;
