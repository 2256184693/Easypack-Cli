/**
 * 项目配置类 继承自默认Config类
 *
 * Created By SH
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

var ConfigFactory = require('./base.js');

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
    if(this.env === 'dev') {
      let entry = this.config.entry;
      Object.keys(entry).forEach(entryKey => {
        entry[entryKey] = [path.join(__easy__.root, './src/client/client.dev.js')].concat(entry[entryKey]);
      });
    }
    return this;
  }

  mergeDevConfig() {

  }

  mergePrdConfig() {

  }

  _init() {
    this.setResolve();
    this.setResolveLoaders();
    this.setCssLoaders();
    this.setPlugins();
    this.setEntryHtml();
  }

  setCssLoaders() {

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
      // TODO: library
    }
  }
}

module.exports = Project;
