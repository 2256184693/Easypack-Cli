/**
 * @file 基础默认配置类
 * @description 将EasyPack的配置文件转变成Webpack的配置
 * @author SH
 */

const path = require('path');

let DEFAULT_KEYS = [
  'amd', 'bail', 'cache', 'loader', 'parallelism', 'profile', 'recordsPath', 'recordsInputPath', 'recordsOutputPath', 'context',
  'entry', 'output', 'module', 'resolve', 'resolveLoader', 'plugins', 'devServer', 'devtool', 'targets', 'watch',
  'watchOptions','externals', 'performance', 'node', 'stats'
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
    var resolve = this.config.resolve;
    var modules = resolve.modules || [];
    var rootNodeModules = path.join(__easy__.root, 'node_modules');
    var proNodeModules = path.join(__easy__.cwd, 'node_modules');
    modules.splice(0, 0, rootNodeModules);
    modules.push(proNodeModules);
    resolve.modules = modules;
    this.config.resolve = resolve;
    return this;
  }

  setResolveLoaders() {
    var resolve = this.config.resolve;
    var resolveLoader = this.config.resolveLoader;
    var modules = resolveLoader.modules || [];
    var alias = resolveLoader.alias || {};
    var rootNodeModules = path.join(__easy__.root, 'node_modules');
    var proNodeModules = path.join(__easy__.cwd, 'node_modules');
    modules.splice(0, 0, rootNodeModules);
    modules.push(proNodeModules);
    alias.sass = 'sass-loader';
    alias['scss-loader'] = 'sass-loader';
    alias.scss = 'sas-loader';
    resolve.modules = modules;
    resolve.alias = alias;
    this.config.resolve = resolve;
    return this;
  }

}

module.exports = ConfigFactory;
