/**
 * global settings
 *
 * Created By SH
 */

const program = require('commander');

const child_process = require('child_process');

const path = require('path');

const log = require('../support/log.js');

var __easy__ = {
  configName: 'easy.webpack.js',
  // 全局模块根目录
  globalRoot: child_process.execSync('npm root -g').toString().trim(),
  // cli的根目录
  root: path.join(__dirname, '../../'),
  // 工作目录
  cwd: process.cwd(),
  // memory-fs
  fs: null,
};

global.log = log;

global.program = program;

global.__easy__ = __easy__;

global.serverLog = log.namespace('Server');

module.exports = __easy__;
