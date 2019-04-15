/**
 * Server
 * Created By SH
 */

const express = require('express')

const detect = require('detect-port')

function Server(opt) {
  this.app = express();
  this.port = opt.port;
}

Server.prototype.init = function() {
  let port = this.port;
  let app = this.app;
  let _this = this;
  return detect(port)
    .then(_port => {
      if(port !== port) {
        log.
      }
    })
}

module.exports = Server;
