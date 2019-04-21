/**
 * Server
 * Created By SH
 */

const express = require('express');

const detect = require('detect-port');

const favicon = require('serve-favicon');

const path = require('path');

const chalk = require('chalk');

const webpack = require('../compiler/index.js');

function Server(opt) {
  this.app = express()
  this.port = opt.port
  this.url = `http://127.0.0.1`
  this.server = null;
};

Server.prototype.init = function() {
  let port = this.port;
  let app = this.app;
  let _this = this;

  console.log(`请求端口${port}`);
  return detect(port)
    .then(_port => {
      console.log(`获取端口${_port}`);
      if(port != port) {
        throw new Error(`端口${port}已被占用，请选择其他端口`);
        return;
      }
      app.use(favicon(path.join(__dirname, './images/favicon.ico')));

      _this.server = require('http').createServer(app).listen(_this.port);

      return webpack.createWebpackInstance(projectConfig, workspace, 'dev');
    }).then((data) => {
      return new Promise(_this.initEvents.bind(_this)).then(data => {
        return data;
      });
    })
}

Server.prototype.initEvents = function(resolve, reject) {
  let server = this.server;
  let _this = this;

  function onListening() {
    resolve({_this});
  }

  function onError(err) {
    if(err.code === 'EADDRINUSE') {
      console.log(`The port ${_this.port} is already in use`);
    }else if(err.code === 'EACCES') {
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

Server.prototype.close = function() {
  this.server.close();
}

module.exports = Server;
