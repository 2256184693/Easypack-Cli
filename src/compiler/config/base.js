/**
 * 基础webpack配置类
 *
 * Created By SH
 */

const path = require('path');

const V = require('./../../utils/const.js');

class BaseConfigFactory {
  constructor(easyConfig, workspace, env) {
    this.easyConfig = easyConfig;
    this.workspace = workspace;
    this.env = env;
    this.config = this._resolve(easyConfig, workspace);
  }
  _resolve(easyConfig, workspace) {
    let config = this._getDefaultConfig();
    config.mode = this.env === 'dev' ? 'development' : 'production';
    Object.keys(easyConfig).forEach(key => {
      if(V.DEFAULT_WEBPACK_KEYS.indexOf(key) > -1) {
        config[key] = easyConfig[key];
      }
    });
    config.context = workspace;
    config.plugins = easyConfig.plugins || [];
    config.module = easyConfig.module || {};
    config.resolve = easyConfig.resolve || {};
    config.resolveLoader = easyConfig.resolveLoader || {};
    return config;
  }
  _getDefaultConfig() {
    return {
      watchOptions: {
        aggregateTimeout: 300
      }
    };
  }
  getWebpackConfig() {
    return this.config;
  }
  _isDev() {
    return this.env === 'dev';
  }
  _isPrd() {
    return this.env === 'prd';
  }
  mergeEnvConfig() {
    if(this.env === 'dev') {
      this.mergeDevConfig();
    }else {
      this.mergePrdConfig();
    }
  }
  mergeDevConfig() {}
  mergePrdConfig() {}
  setOutPutPath() {
    let output = this.config.output || {};
    output.path = path.join(this.workspace, V.OUTPUT_PATH_MAP[this.env]);
    this.config.output = output;
  }
  setOutPutFileName () {
    let output = this.config.output || {};
    output.filename = this.env === 'dev' ? 'scripts/[name].js' : 'scripts/[name].[chunkhash:8].js';
    this.config.output = output;
  }
  setOutputPublicPath() {
    let output = this.config.output || {};
    output.publicPath = '';
    this.config.output = output;
  }
  setResolve() {
    let modules = this.config.resolve.modules || [];
    let easyModules = path.join(__easy__.root, 'node_modules');
    let projectModules = path.join(__easy__.cwd, 'node_modules');
    this.config.resolve.modules = [projectModules, ...modules, easyModules];
    return this;
  }
  setResolveLoaders() {
    let modules = this.config.resolveLoader.modules || [];
    let easyModules = path.join(__easy__.root, 'node_modules');
    let projectModules = path.join(__easy__.cwd, 'node_modules');
    this.config.resolveLoader.modules = [projectModules, ...modules, easyModules];

    let alias = this.config.resolveLoader.alias || {};
    alias.sass = 'sass-loader';
    alias.scss = 'sass-loader';
    alias['scss-loader'] = 'sass-loader';
    this.config.resolveLoader.alias = alias;
    return this;
  }
}

module.exports = BaseConfigFactory;
