/**
 * 基础默认配置类
 *
 * Created By SH
 */

let DEFAULT_KEYS = [
  'amd', 'bail', 'cache', 'loader', 'parallelism', 'profile', 'recordsPath', 'recordsInputPath', 'recordsOutputPath', 'context',
  'entry', 'output', 'module', 'resolve', 'resolveLoader', 'plugins', 'devServer', 'devtool', 'targets', 'watch',
  'watchOptions','externals', 'performance', 'node', 'stats', ''
];

class ConfigFactory {
  constructor(easyConfig, workspace, env) {
    this.easyConfig = easyConfig;
    this.workspace = workspace;
    this.config = this._merge(easyConfig, workspace);
    this.env = env;
  }

  /**
   * @param
   */
  _merge(easyConfig, workspace) {
    let config = {};
    Object.keys(config).forEach(key => {
      if(DEFAULT_KEYS.indexOf(key) > -1) {
        config[key] = easyConfig[key];
      }
    });
    config.context = workspace;
    // config.plugins = easyConfig.plugins || [];
    return config;
  }

  getConfig() {
    return this.config;
  }
}

module.exports = ConfigFactory;
