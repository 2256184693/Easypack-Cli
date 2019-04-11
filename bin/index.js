#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('list', 'list available scripts you can use')


program.parse(process.argv)