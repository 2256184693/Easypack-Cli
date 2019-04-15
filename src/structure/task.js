/**
 * tasks in program
 *
 * Created By SH
 */

const path = require('path');

const fs = require('fs-extra');

const inquirer = require('inquirer');

const Server = require('../server/Server.js');

const COPY_TEMPLATE_SUCCESS = `Project Copied Successfully`;

module.exports = {
  initTemplate: function(templateName, projectName) {
    const projectPath = path.join(__easy__.cwd, projectName);
    const templatePath = path.join(__easy__.root, '/template/' + templateName);
    log.info(`Start Copy template "${templateName}" to your project "${projectName}"...`);
    fs.stat(projectPath, function(err) {
      if(err) {
        // 新建目录并初始化模板
        fs.mkdirSync(projectPath);
        fs.copySync(templatePath, projectPath);
        log.info(COPY_TEMPLATE_SUCCESS);
      }else {
        // 目录存在
        var files = fs.readdirSync(projectPath);
        if(!files.length) {
          fs.copySync(templatePath, projectPath);
          log.info(COPY_TEMPLATE_SUCCESS);
        }else {
          inquirer.prompt([{
            type: 'confirm',
            name: 'continue',
            message: 'The project path you choosed is not empty! Do you want to continue?'
          }]).then(function(answer) {
            if(answer.continue) {
              fs.copySync(templatePath, projectPath);
              log.info(COPY_TEMPLATE_SUCCESS);
            }else {
              log.info(`User Canceled`);
            }
          })
        }
      }
    })
  },
  startServer: function(opt) {
    const port = opt ? (opt.port || 9000) : 9000;

    log.info(`create a local webpack server at ${__easy__.cwd}`);

    process.env.NODE_ENV = 'development';

    var MemoryFileSystem = require("memory-fs");

    __easy__.fs = new MemoryFileSystem();

    var server = new Server({
      port,
    });

    server.init().then(function(server) {
      log.success(`Server start at : ${server.url}:${server.port}`)
    }).catch(function(error) {
      log.error(error)
    });
  },
  build: function(minify) {

  }
}
