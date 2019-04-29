/**
 * load easypack configurations in target project
 *
 * Created By SH
 */

const _ = require('lodash');

const path = require('path');

const fs = require('fs');

var isLoad = false;

var CONFIGS = {};

var DEFAULT_CONFIG = {
  minify : true,  //是否最压缩
  commonPack : true, // 是否加入 公共包,
  optimizeCss : true //优化CSS
};

module.exports = {
  init: function(force) {
    if(!isLoad || force) {
      isLoad = true;
      loadConfig();
    }
    if(_.isEmpty(CONFIGS)) {
      log.error(`cannot load the file: "${__easy__.configName}" at ${__easy__.cwd}`);
      return false;
    }
    return true;
  },
  getEasyConfig: function() {
    return CONFIGS.__default;
  },
};

function loadConfig() {
  let cwd = process.cwd();
  let EasyConfig = getConfig(cwd);
  if(EasyConfig) {
    let config = _.merge({}, DEFAULT_CONFIG, EasyConfig);
    if(config) {
      CONFIGS.__default = {
        config,
      };
      return true;
    }
  }
  return false;
}

// 加载项目配置
function getConfig(dir) {
  let root = path.parse(dir).root;
  let config;
  try {
    let configPath = getConfigPath(dir, root);
    if(configPath) {
      let configDir = path.parse(configPath).dir;
      if (configDir != __easy__.cwd) {
        process.chdir(configDir);
        __easy__.cwd = configDir;
      }
      config = require(configPath);
    }
    return config;
  } catch (e) {
    log.error(`load easy.webpack.js error at ${cwd}`);
    console.log('error:', e);
  }
};

function getConfigPath(p, root) {
  if (p === root) {
    return
  }
  var configPath =  path.join(p, "./easy.webpack.js");

  if (fs.existsSync(configPath)) {
    return configPath;
  } else {
    return getConfigPath(path.join(p, '../'), root);
  }
}
