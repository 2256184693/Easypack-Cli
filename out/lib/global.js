"use strict";
/**
 * @description Global Settings
 */
Object.defineProperty(exports, "__esModule", { value: true });
const EASY_CONST = require("../lib/const");
const child_process = require("child_process");
const path = require("path");
const log_1 = require("../utils/log");
let globalData = {
    logger: new log_1.default(),
    // config file name in project
    configFileName: EASY_CONST.EASY_CONFIG_FILENAME,
    // npm root path
    npmRoot: child_process.execSync('npm root -g').toString().trim(),
    // easypack root path
    root: path.join(__dirname, '../../'),
    // project root path
    cwd: process.cwd()
};
exports.default = globalData;
//# sourceMappingURL=global.js.map