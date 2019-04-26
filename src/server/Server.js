/**
 * Server
 * Created By SH
 */

const express = require('express');

const detect = require('detect-port');

const favicon = require('serve-favicon');

const path = require('path');

const chalk = require('chalk');

const WebpackConfig = require('../structure/config.js');

const webpack = require('../compiler/index.js');

class Server {
  constructor(opt) {
    this.app = express();
    this.port = opt.port;
    this.url = `http://127.0.0.1`;
    this.server = null;
  }

  init() {
    let _this = this;
    let app = this.app;
    let port = this.port;
    let easyConfig = WebpackConfig.getEasyConfig();
    return detect(port)
      .then(_port => {
        if (port != port) {
          throw new Error(`端口${port}已被占用，请选择其他端口`);
          return;
        }
        app.use(favicon(path.join(__dirname, './images/favicon.ico')));

        _this.server = require('http').createServer(app).listen(_this.port);
        return webpack.createWebpackInstance(easyConfig, __easy__.cwd, 'dev');
      }).then((data) => {
        return new Promise(_this._initEvents.bind(_this)).then(data => {
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
