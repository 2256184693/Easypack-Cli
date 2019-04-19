/**
 * program
 *
 * Created By SH
 */

const program = require('commander');

const package = require('../../package.json');

const tasks = require('./task.js');

require('./global.js');

program
  .version(package.version, '-v, --version')
  .usage('<command> [options]')
  .option('-p, --port <port>', 'server port')
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
    var port = program.port || 9000;
    var config = require('./config.js');
    if(config.init()) {
      tasks.startServer({
        port,
      });
    }
  });

program
  .command('build')
  .description('output the project at production mode')
  .action(function() {
    __easy__.env = 'production';
    process.env.NODE_ENV = 'production';
    tasks.build(true);
  })

program.parse(process.argv);

if(program.args.length < 1) {
  program.help();
}
