/**
 * program
 * 
 * Created By SH
 */

const program = require('commander')

const package = require('../../package.json')

const tasks = require('./task.js')

require('./global.js')

program
  .version(package.version, '-v, --version')
  .usage('<command> [options]')
  .option('-p, --port <port>', 'server port')
  .option('--log-time', 'log message with time')
  .option('--grep <grepContent>', 'greo log: debug|access|info|error|warn|detail|<Any other string>')

  .command('init <tenplate-name> [project-name]')
  .description('init a new project from template')
  .action(function(templateName, projectName) {
    if(!templateName) {
      log.error('The template name must be set,')
      return
    }
    tasks.initTemplate(templateName, projectName)
  })

program.parse(process.argv)

if(program.args.length < 1) {
  program.help()
}