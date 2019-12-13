/**
 * resolve Easy Config
 *
 * Created By SH
 */

const _ = require('lodash');

const path = require('path');

const fs = require('fs-extra');

const V = require('../utils/const.js');

let PROJECT_CONFIG = {};

let isLoaded = false;

module.exports = {
  load: (cb) => {
    if(!isLoaded) {
      _load(cb);
    }
    if(_.isEmpty(PROJECT_CONFIG)) {
      log.error(`cannot load the file: ${__easy__.configFileName} at ${__easy__.cwd}`);
    }
  },
  getEasyConfig: () => PROJECT_CONFIG.config,
  getEntryHtml: () => PROJECT_CONFIG.entryHtml,
  getOutputPath: (env) => {
    let easyConfig = PROJECT_CONFIG.config;
    let outputPath = (easyConfig.output && easyConfig.output.path) || path.join(__easy__.cwd, V.OUTPUT_PATH_MAP[env]);
    return outputPath;
  }
};

const _load = (cb) => {
  let cwd = process.cwd();
  let easyConfig = getEasyConfig(cwd);
  if(easyConfig) {
    PROJECT_CONFIG = {
      config: _.merge({}, {}, easyConfig),
      entryHtml: getEntryHtml(easyConfig),
    };
    cb && cb();
  }
};

const getEasyConfig = dir => {
  let root = path.parse(dir).root;
  let easyConfig = null;
  try {
    let easyConfigPath = getConfigPath(dir, root);
    if(easyConfigPath) {
      let configCwd = path.parse(easyConfigPath).dir;
      if(configCwd !== __easy__.cwd) {
        process.chdir(configCwd);
        __easy__.cwd = configCwd;
      }
      easyConfig = require(easyConfigPath);
    }
  } catch (e) {
    log.error(`read ${__easy__.configFileName} error!`);
    console.log(`error:`, e);
  }
  return easyConfig;
};

const getConfigPath = (dir, root) => {
  if(dir === root) {
    return null;
  }
  let targetPath = path.join(dir, `./${__easy__.configFileName}`);
  if(fs.existsSync(targetPath)) {
    return targetPath;
  }
  return getConfigPath(path.join(dir, '../'), root);
};

const getEntryHtml = easyConfig => {
  return x2array(easyConfig.entryHtml);
};

const x2array = data => {
  if(Array.isArray(data)) {
    return data;
  } else if(!data) {
    return data;
  } else {
    return Object.keys(data).map(key => ({
      key,
      value: data[key]
    }));
  }
};
