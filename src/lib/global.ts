/**
 * @description Global Settings
 */

import * as EASY_CONST from '../lib/const'

import * as child_process from 'child_process'

import * as path from 'path'

import Logger from '../utils/log'

interface GlobalData {
  logger: Logger;
  configFileName: string;
  npmRoot: string;
  root: string;
  cwd: string;
}

let globalData: GlobalData = {
  logger: new Logger(),
  // config file name in project
  configFileName: EASY_CONST.EASY_CONFIG_FILENAME,
  // npm root path
  npmRoot: child_process.execSync('npm root -g').toString().trim(),
  // easypack root path
  root: path.join(__dirname, '../../'),
  // project root path
  cwd: process.cwd()
}

export default globalData;
