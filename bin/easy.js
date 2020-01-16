#!/usr/bin/env node

const chalk = require('chalk')

const semver = require('semver')

const didYouMean = require('didyoumean')

didYouMean.threshold = 0.6;

const package = require('../package.json')

const requiredVersion = package.engines.node

if(!semver.satisfies(process.version, requiredVersion)) {
  console.log(chalk.red(
    `Package ${package.name} requires Node ${requiredVersion},` +
    `but you are useing Node ${process.version}. Please upgrade your node version.`
  ))
  process.exit(1)
}

const program = require('commander')

// const minimist = require('minimist')

program
  .version(package.version, '-v --version')
  .option('--debug', 'this option is for developers to debug')
  .option('--logDetail', 'show detail log with timestamp')
  .usage('<command> [options]')

program
  .command('create <project-name>')
  .option('-d, --default', 'use default settings for preset')
  .option('-f, --force', 'overwrite if target directory exists')
  .description('generate a project from target template')
  .action((name, cmd) => {
    const create = require('../out/commands/create.js').default;
    const args = parseOptions(cmd)
    create(name, args)
  })

program
  .command('start')
  .description('start a local server')
  .option('-o, --open', 'open browser when server is running')
  .option('-p, --port <port>', 'server port(default: 9000)')
  .action((cmd) => {
    console.log(`easy comman start:`, port)
  })

program
  .command('build <tempalte> <app-name>')
  .description('generate a project from target template')
  .action((cmd) => {

  })

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp();
    console.log()
    console.log(chalk.red(`Error: Unknown command '${cmd}'`))
    console.log()
    suggestions(cmd)
  })

program
  .on('--help', () => {
    console.log()
    console.log(` Run ${chalk.cyan('easy <command> --help')} for detailed usage`)
    console.log()
  })

program.Command.prototype.missingArgument = function(argName) {
  console.log()
  this.outputHelp();
  console.log()
  console.log(chalk.red(`Missing required argument ${chalk.yellow(`<${argName}>`)}`))
  process.exit(1)
}

program.parse(process.argv)

if(!process.argv.slice(2).length) {
  program.outputHelp()
}


function suggestions(unknownCmd) {
  const commands = program.commands.map(cmd => cmd._name)
  const result = didYouMean(unknownCmd, commands)

  result && console.log(`Did you mean ${chalk.yellow(result)} ?`)
}

function parseOptions (cmd) {
  return (cmd.options || []).reduce((pre, cur) => {
    const key = cur.long.replace(/^--/, '').replace(/-(\w)/g, (match, p1) => p1 ? p1.toUpperCase() : '')
    if(cmd[key] !== undefined) {
      pre[key] = cmd[key]
    }
    return pre;
  }, {})
}
