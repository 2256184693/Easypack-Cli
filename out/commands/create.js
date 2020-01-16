"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require('commander');
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs-extra");
const log_1 = require("../utils/log");
const spinner_1 = require("../utils/spinner");
const clearDicretory = (targetDir) => {
    spinner_1.start('Cleaning directory...');
    try {
        fs.removeSync(targetDir);
        spinner_1.succeed();
    }
    catch (e) {
        spinner_1.fail();
        log_1.default.error(e);
    }
};
const create = (name, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (program.debug) {
        log_1.default.out(name, args);
    }
    const cwd = args.cwd || process.cwd();
    const isCurrent = name === '.';
    const projectName = isCurrent ? path.relative('../', cwd) : name;
    const targetDir = isCurrent ? cwd : path.resolve(cwd, projectName);
    if (fs.existsSync(targetDir)) {
        if (args.force) {
            clearDicretory(targetDir);
        }
        else {
            if (!isCurrent) {
                const { mode } = yield inquirer.prompt([
                    {
                        name: 'mode',
                        type: 'list',
                        message: `Target directory already exists. Choose an handle mode:`,
                        choices: [
                            { name: 'Overwrite', value: 'overwrite' },
                            { name: 'Merge', value: 'merge' },
                            { name: 'Cancel', value: '' },
                        ]
                    }
                ]);
                if (!mode) {
                    return false;
                }
                if (mode === 'overwrite') {
                    clearDicretory(targetDir);
                }
            }
        }
    }
    // new Creator(name, targetDir);
});
exports.default = (name, args) => {
    return create(name, args).catch(e => {
        process.exit(1);
    });
};
