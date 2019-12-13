/**
 * Dll Cache 相关
 *
 * Created By SH
 */

const _ = require('lodash');

const path = require('path');

const fs = require('fs');

const fse = require('fs-extra');

const V = require('../../utils/const.js');

const dllLog = log.namespace('DLL');

const getDllData = (workspace, env) => {
  try {
    let dllData = fs.readFileSync(path.join(workspace, V.DEFAULT_CACHE_PATH, V.DEFAULT_CACHE_NAME));
    if(dllData) {
      return JSON.parse(dllData);
    }
  } catch (e) {
    // dllLog.warn(e.message);
  }
}

// check library
const checkLibrary = (easyConfig, dllData) => {
  let libraryString = JSON.stringify(easyConfig.library);
  return dllData.libraryString === libraryString;
}

// check dll-file.json
const checkDllFile = (cacheDir, env) => {
  return fs.existsSync(path.join(cacheDir, V.OUTPUT_PATH_MAP[env], V.DEFAULT_DLL_FILES_PATH));
}

// check [name]-manifest.json
const checkDllManifest = (easyConfig, dllData, cacheDir, env) => {
  let dlls = Object.keys(easyConfig.library);
  let key = dlls.find(dllName => {
    return !fs.existsSync(path.join(cacheDir, V.OUTPUT_PATH_MAP[env], dllData.manifest.replace(/\[name\]/, dllName)));
  });
  return !key;
}

// check dll chunk
const checkDllChunk = (dllData, cacheDir, env) => {
  let dllFiles = fs.readFileSync(path.join(cacheDir, V.OUTPUT_PATH_MAP[env], dllData.dllFilePath));
  dllFiles = JSON.parse(dllFiles);
  let files = Object.keys(dllFiles).map(dllName => dllFiles[dllName]);
  files = _.flatten(files).map(filePath => path.join(cacheDir, V.OUTPUT_PATH_MAP[env], filePath));
  return !files.find(filePath => !fs.existsSync(filePath));
}

exports.hasCache = (easyConfig, workspace, env) => {

  let cacheDir = path.join(workspace, V.DEFAULT_CACHE_PATH);

  dllLog.info(`Cache checking...`);
  let dllData = getDllData(workspace, env);
  if(!dllData) { // check cache-manifest.json
    dllLog.warn(`Cache checked unsuccessfully.(no cache manifest)`);
    return false;
  }
  if(!checkLibrary(easyConfig, dllData)) {
    dllLog.warn(`Cache checked unsuccessfully.(library matched fail)`);
    return false;
  }
  if(!checkDllFile(cacheDir, env)) {
    dllLog.warn(`Cache checked unsuccessfully.(no dll file)`);
    return false;
  }
  if(!checkDllManifest(easyConfig, dllData, cacheDir, env)) {
    dllLog.warn(`Cache checked unsuccessfully.(no dll manifest)`);
    return false;
  }
  if(!checkDllChunk(dllData, cacheDir, env)) {
    dllLog.warn(`Cache checked unsuccessfully.(no dll chunk)`);
    return false;
  }
  dllLog.info(`Cache checked successfully`);
  return true;
};

/**
 * 存储cache.manifest.json， 包含dll信息
 * 存储dist中的dll相关文件，便于再次使用。
 */
exports.createCache = (dllConfig, workspace, env, cacheData) => {
  let outputPath = dllConfig.output.path;
  let cacheDir = path.join(workspace, V.DEFAULT_CACHE_PATH);
  let filePath = path.join(cacheDir, V.DEFAULT_CACHE_NAME);
  if(fs.existsSync(cacheDir)) {
    fse.removeSync(cacheDir);
    dllLog.info(`Clean cache successfully...`);
  }
  fs.mkdirSync(cacheDir);
  fs.writeFileSync(filePath, JSON.stringify(cacheData));
  dllLog.info(`Write Dlls into cache: ${cacheDir}`);
  // 存储打包出来的dll文件夹
  fse.copySync(path.join(outputPath, '/dll'), path.join(cacheDir, V.OUTPUT_PATH_MAP[env], '/dll'));
  // 存储dll相关的chunk
  let dllFiles = fs.readFileSync(path.join(outputPath, cacheData.dllFilePath));
  dllFiles = JSON.parse(dllFiles);
  Object.keys(dllFiles).forEach(chunkName => {
    dllFiles[chunkName] && dllFiles[chunkName].length && dllFiles[chunkName].forEach(filePath => {
      fse.copySync(path.join(outputPath, filePath), path.join(cacheDir, V.OUTPUT_PATH_MAP[env], filePath));
    })
  });
}

exports.useCache = (outputPath, workspace, env) => {
  dllLog.info(`Copy dll cache into build path`);
  let cacheDir = path.join(workspace, V.DEFAULT_CACHE_PATH);
  fse.copySync(path.join(cacheDir, V.OUTPUT_PATH_MAP[env]), outputPath);
}
