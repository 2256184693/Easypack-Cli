/**
 * Webpack Server Class
 *
 * Created By SH
 */

const _ = require('lodash');

const path = require('path');

const V = require('../utils/const.js');

const resolveConfig = require('../cli/resolve-config.js');

const express = require('express');

const detect = require('detect-port');

const favicon = require('serve-favicon');

const webpack = require('../compiler/index.js');

const SourceMiddleware = require('./middleware/source.js');

const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackHotMiddleware = require('webpack-hot-middleware');

const open = require('open');

const chalk = require('chalk');

class easyServer {
  constructor(options) {
    let opts = _.merge({}, V.DEFAULT_SERVER_OPTIONS, options);
    this.app = express();
    this.port = opts.port;
    this.host = opts.host;
    this.url = this.host + ':' + this.port;
    this.server = null;
  }

  run() {
    let _this = this;
    let app = _this.app;
    let easyConfig = resolveConfig.getEasyConfig();
    let entryHtml = resolveConfig.getEntryHtml();
    return detect(_this.port).then(_port => {
      if(_port != _this.port) {
        throw new Error(`端口${_this.port}已被占用，请选择其他端口`);
      }else {
        app.use(favicon(path.join(__dirname, './images/favicon.ico')));
        app.use('__easy__', SourceMiddleware);
        return webpack.createCompiler(easyConfig, __easy__.cwd, 'dev');
      }
    }).then(data => {
      const compiler = data.compiler;
      const webpackConfig = data.config;
      const publicPath = webpackConfig.output.publicPath || '/';
      app.use(webpackDevMiddleware(compiler, {
        publicPath,
        stats: {
          colors: true,
        },
        watchOptions: webpackConfig.watchOptions
      }));
      app.use(webpackHotMiddleware(compiler, {
        log: () => {}
      }));

      // TODO: 文件管理

      // TODO: 错误处理

      _this.server = require('http').createServer(app).listen(_this.port);

      return new Promise(_this.bindEvents.bind(_this)).then(data => {
        let openBrowser = easyConfig.openBrowser;
        if(openBrowser) {
          if(typeof openBrowser === 'string') {
            if(/^https?:\/\//.test(openBrowser)) {
              open(openBrowser);
            }else {
              open(data.url + openBrowser);
            }
          }else {
            if(entryHtml && entryHtml[0] && entryHtml[0].filename) {
              open(data.url + path.join(publicPath, entryHtml[0].filename));
            }else {
              open(data.url);
            }
          }
        }
        return data;
      });
    })
  }

  close() {
    this.server && this.server.close();
  }

  bindEvents(resolve, reject) {
    let server = this.server;
    let _this = this;
    server.on('error', e => {
      if(e.code === 'EADDRINUSE') {
        console.log(`The port ${this.port} is already in use`);
      }else {
        console.log(`Permission denied.Please try running the command again as root/Administrator`)
      }
      this.close();
      reject(e);
    });

    server.on('listening', () => {
      resolve(_this);
    });

    process.on('SIGHT', () => {
      this.close();
      process.exit();
      console.log(chalk.yellow(`Easy-Cli ended. Bye Bye.`));
    });

    process.on('SIGTERM', () => {
      this.close();
      process.exit();
      console.log(chalk.yellow(`Easy-Cli ended. Bye Bye.`));
    });
  }
}

module.exports = easyServer;
