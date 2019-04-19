/**
 * load configurations in target project
 *
 * Created By SH
 */

const _ = require('lodash');

const path = require('path');

const fs = require('fs');

var isLoad = false;

var CONFIGS = {};

var DEFAULT_CONFIG = {};

module.exports = {
  init: function(force) {
    if(!isLoad || force) {
      isLoad = true;
      load();
    }
    if(_.isEmpty(CONFIGS)) {
      log.error(`cannot load the file: "${__easy__.configName}" at ${__easy__.cwd}`);
      return false;
    }
    return true;
  }
};

function load() {
  let config = _.merge({}, DEFAULT_CONFIG, loadConfig());
  if(config) {

  }
}
// 加载项目配置
function loadConfig() {
  let cwd = process.cwd();
  let root = path.parse(cwd).root;
  let config, configPath;
  try {
    configPath = getConfigPath(cwd, root);
    if(configPath) {
      config = require(configPath);
    }
  } catch (e) {
    log.error(`load the config file error at ${cwd}`);
    log.error(e);
  }
  return config;
};

/**
 * @description 获取项目中的配置路径
 *
 * @param {p} 当前路径
 * @param {root} 根路径
 */
function getConfigPath (p, root) {
  if(p === root) {
    return undefined;
  }
  var configPath = path.join(p, './', __easy__.configName);
  if(fs.existsSync(configPath)) {
    return configPath;
  }else {
    return getConfigPath(path.join(p, '../'), root);
  }
}
