/**
 * Global Settings
 *
 * Created By SH
 */

const child_process = require('child_process');

const path = require('path');

const log = require('../utils/log.js');

var __easy__ = {
  // 配置文件名
  configFileName: 'easy.webpack.js',
  // 全局模块目录
  globalRoot: child_process.execSync('npm root -g').toString().trim(),
  // 脚手架根目录
  root: path.join(__dirname, '../../'),
  // 工作目录
  cwd: process.cwd(),
};

// 全局注册log事件
global.log = log;
// 全局注册__easy__
global.__easy__ = __easy__;
