"use strict";
/**
 * @description Log
 */
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const program = require("commander");
const type_1 = require("./type");
function getColor() {
    let color = 'green';
    color = 'yellow';
    return color;
}
class Logger {
    constructor(namespace = '') {
        this.__namespace = namespace;
    }
    print(messageType, message, color) {
        if (type_1.default(message) === 'object') {
            message = JSON.stringify(message);
        }
        else if (type_1.default(message) === 'array') {
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
    info(message, color = 'blue') {
        this.print('info', message, color);
    }
    success(message, color = 'blue') {
        this.print('success', message, color);
    }
    warn(message, color = 'blue') {
        this.print('info', message, color);
    }
    error(message, color = 'blue') {
        this.print('info', message, color);
    }
}
exports.default = Logger;
//# sourceMappingURL=log.js.map