/**
 * @file 基础默认配置类
 * @description 将EasyPack的配置文件转变成Webpack的配置
 * @author SH
 */

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
    this.config = this._merge(easyConfig, workspace);
  }

  _merge(easyConfig, workspace) {
    let config = this._getDefaultConfig();
    config.mode = this.env === 'dev' ? 'development' : 'production';
    Object.keys(easyConfig).forEach(key => {
      if(DEFAULT_KEYS.indexOf(key) > -1) {
        config[key] = easyConfig[key];
      }
    });
    config.context = workspace;
    // config.plugins = easyConfig.plugins || [];
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
}

module.exports = ConfigFactory;
