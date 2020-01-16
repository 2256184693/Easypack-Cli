"use strict";
/**
 * @description Log
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const program = require("commander");
const tools_1 = require("./tools");
class Logger {
    constructor(namespace = '') {
        this.__namespace = namespace;
    }
    print(messageType, message, color) {
        if (tools_1.type(message) === 'object') {
            message = JSON.stringify(message);
        }
        else if (tools_1.type(message) === 'array') {
            message = message.join('\n');
        }
        let timeStr = '', name = '';
        if (program.timestamp) {
            timeStr = `[${new Date().toLocaleString()}]`;
        }
        if (this.__namespace) {
            name = `[${this.__namespace}]`;
        }
        console.log(chalk.gray(timeStr) +
            chalk.bgCyan(name) +
            chalk[color](message));
    }
    info(message, color = 'cyan') {
        this.print('info', message, color);
    }
    success(message, color = 'green') {
        this.print('success', message, color);
    }
    warn(message, color = 'yellow') {
        this.print('info', message, color);
    }
    error(message, color = 'red') {
        this.print('info', message, color);
    }
    out(...messageList) {
        console.log(messageList.map((msg) => {
            if (tools_1.type(msg) === 'object') {
                return JSON.stringify(msg, null, 2);
            }
            return msg;
        }).join('\n'));
    }
}
exports.default = new Logger();
