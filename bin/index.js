#!/usr/bin/env node

const path = require('path');

const child_process = require('child_process');

const chalk = require('chalk');

var spliter = path.delimiter;

var NODE_PATH = process.env.NODE_PATH;

var node_path = [ path.join(__dirname, "../node_modules") ].join(spliter) + (NODE_PATH ? spliter + NODE_PATH : '');

process.env.NODE_PATH = node_path;

var childProcess = child_process.fork(path.join(__dirname, '../src/structure/command.js'), process.argv.slice(2), {
  execArgv: []
});

process.on('SIGINT', end);

process.on('SIGTERM', end);

function end() {
  if(childProcess) {
    childProcess.kill('SIGKILL');
    childProcess = null;
  }

  console.log(chalk.yellow(`
Easy-Cli ended, Bye Bye
`));
}
