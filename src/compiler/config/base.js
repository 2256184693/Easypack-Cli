/**
 * @file 基础默认配置类
 * @description 将EasyPack的配置文件转变成Webpack的配置
 * @author SH
 */

const path = require('path');

let DEFAULT_KEYS = [
  'amd', 'bail', 'cache', 'loader', 'parallelism', 'profile', 'recordsPath', 'recordsInputPath', 'recordsOutputPath', 'context',
  'entry', 'output', 'module', 'resolve', 'resolveLoader', 'plugins', 'devServer', 'devtool', 'targets', 'watch',
  'watchOptions','externals', 'performance', 'node', 'stats',
  'mode',
  'optimization'
];

class ConfigFactory {
  constructor(easyConfig, workspace, env) {
    this.easyConfig = easyConfig;
    this.workspace = workspace;
    this.env = env;
    this.config = this._resolve(easyConfig, workspace);
  }

  _isDev() {
    return this.env === 'dev';
  }

  _isPrd() {
    return this.env === 'prd';
  }

  _resolve(easyConfig, workspace) {
    let config = this._getDefaultConfig();
    config.mode = this.env === 'dev' ? 'development' : 'production';
    Object.keys(easyConfig).forEach(key => {
      if(DEFAULT_KEYS.indexOf(key) > -1) {
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

  getConfig() {
    return this.config;
  }

  mergeEnvConfig() {
    if(this.env === 'dev') {
      this.mergeDevConfig();
    }else {
      this.mergePrdConfig();
    }
  }

  mergeDevConfig() {

  }

  mergePrdConfig() {

  }

  setResolve() {
    var modules = this.config.resolve.modules || [];
    var easyPath = path.join(__easy__.root, 'node_modules');
    var projectPath = path.join(__easy__.cwd, 'node_modules');
    this.config.resolve.modules = [ projectPath, ...modules, easyPath ];
    return this;
  }

  setResolveLoaders() {
    var modules = this.config.resolveLoader.modules || [];
    var easyPath = path.join(__easy__.root, 'node_modules');
    var projectPath = path.join(__easy__.cwd, 'node_modules');
    this.config.resolveLoader.modules = [projectPath, ...modules, easyPath ];

    var alias = this.config.resolveLoader.alias || {};
    alias.sass = 'sass-loader';
    alias['scss-loader'] = 'sass-loader';
    alias.scss = 'sass-loader';
    this.config.resolveLoader.alias = alias;
    return this;
  }

}

module.exports = ConfigFactory;
