/**
 * cli commands
 *
 * Created By SH
 */

require('./global.js');

const program = require('commander');

const package = require('../../package.json');

const tasks = require('./task.js');

const V = require('../utils/const.js');

program
  .version(package.version, '-v --version')
  .usage('<command> [options]')
  .option('-p, --port <port>', 'server port')
  .option('-d, --date', 'log with current date')
  .option('-t, --test', 'output webpack config')

program
  .command('init <template-name> [project-name]')
  .description('init a new porject from target template')
  .action((templateName, projectName) => {
    if(!templateName) {
      log.error('Template name is required');
      return
    }else if(!projectName) {
      let defaultProjectName = 'demo-project';
      log.warn(`Missing to set the project name! Use the default name(${defaultProjectName})`);
      projectName = defaultProjectName;
    }
    tasks.initProject(templateName, projectName);
  });

program
  .command('start')
  .description('create a webpack server to run project')
  .action(() => {
    process.env.NODE_ENV = 'development';
    let resolveConifg = require('./resolve-config.js');
    resolveConifg.load(() => {
      let port = program.port || V.DEFAULT_PORT;
      tasks.start({
        port
      });
    });
  });

  program
  .command('build')
  .description('output project in production mode')
  .action(() => {
    process.env.NODE_ENV = 'production';
    let resolveConifg = require('./resolve-config.js');
    resolveConifg.load(() => {
      tasks.build();
    });
  });

program.parse(process.argv);

if(program.args.length < 1) {
  program.help();
}
