/**
 * global settings
 *
 * Created By SH
 */

const program = require('commander')

const child_process = require('child_process')

const path = require('path')

const log = require('../support/log.js')

var __easy__ = {
  // 全局模块根目录
  globalRoot: child_process.execSync('npm root -g').toString().trim(),
  // cli的根目录
  root: path.join(__dirname, '../../'),
  // 工作目录
  cwd: process.cwd(),
  // memory-fs
  fs: null,
}

global.__easy__ = __easy__
global.log = log

module.exports = __easy__
