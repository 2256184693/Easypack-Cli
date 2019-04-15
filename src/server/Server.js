/**
 * Server
 * Created By SH
 */

const express = require('express');

const detect = require('detect-port');

const favicon = require('serve-favicon');

const path = require('path');

const chalk = require('chalk');

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
  return detect(port)
    .then(_port => {
      if(port !== port) {
        log.error(`端口${port}已被占用，请选择其他端口`);
      }
      app.use(favicon(path.join(__dirname, './images/favicon.ico')));

      app.get('/', (req, res) => res.send('Hello World!'));

      _this.server = require('http').createServer(app).listen(_this.port);

      return new Promise(_this.initEvents.bind(_this)).then(data => {

      });
    })
}

Server.prototype.initEvents = function(resolve, reject) {
  let server = this.server;
  let _this = this;
  process.on('SIGINT', () => {
    _this.close();
    process.exit();
    console.log(chalk.yellow(`
Easy-Cli ended. Bye Bye.
    `));
  });

  process.on('SIGTERM', () => {
    _this.close();
    process.exit();
    console.log(chalk.yellow(`
Easy-Cli ended. Bye Bye.
    `));
  });
}

Server.prototype.close = function() {
  this.server.close();

  if(this.httpsServer)
}

module.exports = Server;
