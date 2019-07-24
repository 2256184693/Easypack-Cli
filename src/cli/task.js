/**
 * Cli tasks
 *
 * Created By SH
 */

const path = require('path');

const chalk = require('chalk');

const fs = require('fs-extra');

const inquirer = require('inquirer');

const easyServer = require('../server/index.js');

const resolveConfig = require('../cli/resolve-config.js');

const webpack = require('../compiler/index.js');

module.exports = {
  initProject: (templateName, projectName) => {
    const projectPath = path.join(__easy__.cwd, projectName);
    const templatePath = path.join(__easy__.root, '/template/' + templateName);
    log.info(`Start to copy template(${templateName}) into your project(${projectName})`);
    fs.stat(projectPath, err => {
      if(err) {
        fs.mkdir(projectPath);
        fs.copySync(templatePath, projectPath);
        log.success(`Project has inited successfully`);
      }else {
        let files = fs.readdirSync(projectPath);
        if(!files.length) {
          fs.copySync(templatePath, projectPath);
          log.success(`Project has inited successfully`);
        }else {
          inquirer.prompt([{
            type: 'confirm',
            name: 'continue',
            message: 'The project path you choosed is not enmty! Do you want to continue'
          }]).then(answer => {
            if(answer.continue) {
              fs.copySync(templatePath, projectPath);
              log.success(`Project has inited successfully`);
            }else {
              log.warn(`Canceled!!`);
            }
          });
        }
      }
    });
  },
  start: options => {
    log.info(`Easy-Cli is working at ${__easy__.cwd}!!`);
    let MemoryFileSystem = require('memory-fs');
    __easy__.fs = new MemoryFileSystem();

    let server = new easyServer(options);
    server.run().then(server => {
      log.success(`Easy-Server start at ${server.url}`);
    }).catch(e => {
      log.error(`Server Error:${e}`);
      console.log(e);
    });
  },
  build: () => {
    const start = Date.now();
    log.info('Easy-Cli start building...');
    let easyConfig = resolveConfig.getEasyConfig();
    let promise = webpack.createCompiler(easyConfig, __easy__.cwd, 'prd');
    promise.then(data => {
      if(data.compiler) {
        data.compiler.run((e, stats) => {
          const end = Date.now();
          let info = stats.toJson();
          if(e || stats.hasErrors()) {
            log.error(`Build Error`, info.errors.join('\n\n'));
            log.info(`Easy-Cli Build End! Spend Time: ${chalk.yellow(end - start + '')} ms`);
            return false;
          }
          console.log(stats.toString({
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            errorDetails: false,
            errors: false,
            colors: true
          }));
          log.success('Build Success');
          log.info(`Easy-Cli Build End! Spend Time: ${chalk.yellow(end - start + '')} ms`);
        });
      }
    }).catch(e => {
      const end = Date.now();
      log.info(`Easy-Cli Build End! Spend Time: ${chalk.yellow(end - start + '')}`);
      log.error(`Build Error`, e);
      console.log('Build Error:', e);
    });

  }
}
