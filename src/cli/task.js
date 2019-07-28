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

const DllCache = require('../compiler/utils/dll-cache.js');

const V = require('../utils/const.js');

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
    let easyConfig = resolveConfig.getEasyConfig();
    let outputPath = resolveConfig.getOutputPath('prd');
    cleanDist(outputPath);
    log.info('Easy-Cli start building...');
    let promise;
    if(easyConfig.library) {
      if(DllCache.hasCache(easyConfig, __easy__.cwd, 'prd')) { // 判断dll缓存
        DllCache.useCache(outputPath, __easy__.cwd, 'prd');
        promise = webpack.createBaseCompiler(easyConfig, __easy__.cwd, 'prd');
      }else {
        promise = webpack.createCompilerWithDll(easyConfig, __easy__.cwd, 'prd');
      }
    }else {
      promise = webpack.createBaseCompiler(easyConfig, __easy__.cwd, 'prd');
    }
    promise.then(data => {
      if(data.compiler) {
        data.compiler.run((e, stats) => {
          let info = stats.toJson();
          if(e) {
            log.error(`Build Error: ${e}`);
            return
          }
          if(stats.hasErrors()) {
            log.error(`Build Error: ${info.errors.join('\n')}`);
            return false;
          }
          process.stdout.write(stats.toString({
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
            errorDetails: false,
            errors: false,
            colors: true
          }) + '\n');
          if(data.easyDll) { // 存在dll，缓存相关内容
            let dllCacheData = data.easyDll.getCacheData();
            DllCache.createCache(data.dllConfig, __easy__.cwd, 'prd', dllCacheData);
          }
          const end = Date.now();
          log.success(`Easy-Cli Build Success!  Spend Time: ${chalk.yellow(end - start + '')} ms`);
        });
      }
    }).catch(e => {
      log.error(`Build Error ${e}`);
    });

  }
}

/**
 * 清空打包目录
 */

const cleanDist = (buildPath) => {
  if(fs.existsSync(buildPath)) {
    fs.removeSync(buildPath);
    log.info(`Clean build folder successfully!`);
  }
}
