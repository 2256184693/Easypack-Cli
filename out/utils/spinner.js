"use strict";
/**
 * @description log with spinner
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ora = require("ora");
const chalk = require("chalk");
const spinner = ora();
let prevSpinner;
exports.start = (text, symbol = chalk.green('√')) => {
    if (prevSpinner) {
        spinner.stopAndPersist({
            text: prevSpinner.text,
            symbol: prevSpinner.symbol
        });
    }
    prevSpinner = {
        text,
        symbol
    };
    spinner.start();
};
exports.succeed = () => {
    if (prevSpinner) {
        spinner.stopAndPersist({
            text: prevSpinner.text,
            symbol: prevSpinner.symbol
        });
    }
    else {
        spinner.stop();
    }
    prevSpinner = null;
};
exports.fail = (text) => {
    spinner.fail(text);
    prevSpinner = null;
};
