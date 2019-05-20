/**
 * program
 *
 * Created By SH
 */
require('./global.js');

const program = require('commander');

const package = require('../../package.json');

const tasks = require('./task.js');

const path = require('path');

program
  .version(package.version, '-v, --version')
  .usage('<command> [options]')
  .option('-p, --port <port>', 'server port')
  .option('-q, --quiet', 'webpack compile quietly')
  .option('--log-time', 'log message with time')
  .option('--grep <grepContent>', 'greo log: debug|access|info|error|warn|detail|<Any other string>');

program
  .command('init <tenplate-name> [project-name]')
  .description('init a new project from template')
  .action(function(templateName, projectName) {
    if(!templateName) {
      log.error('The template name must be set.');
      return
    }else if(!projectName) {
      var defaultProName = 'demo-template';
      log.warn(`The template name is not set, use the default name  "${defaultProName}".`);
      projectName = defaultProName;
    }
    tasks.initTemplate(templateName, projectName);
  });

program
  .command('start')
  .description('create a webpack server to run project')
  .action(function() {
    process.env.NODE_ENV = 'development';
    var config = require('./config.js');
    if(config.init()) {
      var port = program.port || 9000;
      tasks.startServer({
        port,
      });
    }
  });

program
  .command('build')
  .description('output the project at production mode')
  .action(function() {
    process.env.NODE_ENV = 'production';
    var config = require('./config.js');
    if(config.init()) {
      tasks.build(true);
    }
  })

program.parse(process.argv);

if(program.args.length < 1) {
  program.help();
}
