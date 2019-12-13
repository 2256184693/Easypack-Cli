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

program
  .version(package.version, '-v --version')
  .usage('<command> [options]')

program
  .command('init <tempalte> <app-name>')
  .description('generate a project from target template')
  .action((cmd) => {

  })

program
  .command('start')
  .description('generate a project from target template')
  .option('-o, --open', 'open browser')
  .option('-p, --port <port>')
  .action((cmd) => {

  })

program
  .command('build <tempalte> <app-name>')
  .description('generate a project from target template')
  .action((cmd) => {

  })

program
  .command('release')
  .description('output a release')
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

program.parse(process.argv)

if(!process.argv.slice(2).length) {
  program.outputHelp()
}

function suggestions(unknownCmd) {
  const commands = program.commands.map(cmd => cmd._name)
  const result = didYouMean(unknownCmd, commands)

  result && console.log(`Did you mean ${chalk.yellow(result)} ?`)
}

require('../out/lib/global.js')
