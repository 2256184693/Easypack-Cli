/**
 * Server
 * Created By SH
 */

const express = require('express');

const detect = require('detect-port');

const favicon = require('serve-favicon');

const path = require('path');

const chalk = require('chalk');

const config = require('../structure/config.js');

const webpack = require('../compiler/webpack.js');

const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackHotMiddleware = require('webpack-hot-middleware');

const fileExplorerMiddleware = require('./middlewares/file-system.js');

const errorMiddleware = require('./middlewares/error.js');

const serverSourceMiddleware = require('./middlewares/server-source.js');

const open = require('open');

class Server {
  constructor(opt) {
    this.app = express();
    this.port = opt.port;
    this.host = `http://127.0.0.1`;
    this.server = null;
    this.url = `${this.host}:${this.port}`;
  }

  init() {
    let _this = this;
    let app = this.app;
    let port = this.port;
    let easyConfig = config.getEasyConfig();
    return detect(port)
      .then(_port => {
        if (port != port) {
          throw new Error(`${port}端口已被占用，请选择其他端口`);
        }else {
          app.use(favicon(path.join(__dirname, './images/favicon.ico')));

          app.use('/__easy__/', serverSourceMiddleware);

          return webpack.createWebpackInstance(easyConfig.config, __easy__.cwd, 'dev');
        }
      }).then((data) => {
        const compiler = data.compiler;

        const webpackConfig = data.config;

        const publicPath = webpackConfig.output.publicPath || '/';

        // webpack-dev-middleware
        app.use(webpackDevMiddleware(compiler, {
          publicPath,
          stats: {
            colors: true,
          },
          watchOptions: webpackConfig.watchOptions
        }));

        // webpack-hot-middleware
        app.use(webpackHotMiddleware(compiler, {
          log: () => {},
        }));

        // 文件管理系统
        app.use(fileExplorerMiddleware);
        // 错误处理
        app.use(errorMiddleware);

        _this.server = require('http').createServer(app).listen(_this.port);

        return new Promise(_this._initEvents.bind(_this)).then(data => {
          // 是否需要在浏览器打开页面
          let openBrowser = easyConfig.config.openBrowser;
          if(openBrowser) {
            if(typeof openBrowser === 'string') {
              if(openBrowser.match(/^https?:\/\//)) {
                open(openBrowser);
              }else {
                open(data.url + openBrowser);
              }
            }else {
              var entryHtml = easyConfig.entryHtml;
              if(entryHtml && entryHtml[0] && entryHtml[0].filename) {
                open(data.url + path.join(publicPath, entryHtml[0].filename));
              }
            }
          }
          return data;
        });
      });
  }

  close() {
    this.server && this.server.close();
  }

  _initEvents(resolve, reject) {
    let server = this.server;
    let _this = this;
    function onListening() {
      resolve(_this);
    }

    function onError(err) {
      if (err.code === 'EADDRINUSE') {
        console.log(`The port ${_this.port} is already in use`);
      } else if (err.code === 'EACCES') {
        console.log(`Permission denied. Please try running command again as root/Administrator`);
      }
      _this.close();
      reject(err);
    }

    server.on('error', onError);
    server.on('listening', onListening);

    process.on('SIGINT', () => {
      _this.close();
      process.exit();
      console.log(chalk.yellow(`Easy-Cli ended. Bye Bye.`));
    });

    process.on('SIGTERM', () => {
      _this.close();
      process.exit();
      console.log(chalk.yellow(`Easy-Cli ended. Bye Bye.`));
    });
  }
}

module.exports = Server;
