/**
 * log.js
 * 
 * Created By SH
 */

const program = require('commander')

const chalk = require('chalk')

const iconMap = {
  'debug'   : '➤',
  'access'  : '✔',
  'info'    : 'ℹ',
  'error'   : '✘',
  'warn'    : '⚠',
  'success' : '✔',
  'detail'  : '❄'
};

module.exports = {
  namespace: function(name) {
    var log = Object.create(this)
    log.__namespace = name
    return log
  },
  printMessage: function(messageType, color, ignoreNamespace, message) {
    const grep = program.grep;
    let time = '';
    if(arguments.length === 3) {
      message = ignoreNamespace
      ignoreNamespace = false
    }

    if(typeof message === 'object') {
      message = Array.prototype.join.call(message, ' ')
    }

    if(this.__namespace && !ignoreNamespace) {
      message = this.__namespace + ' - ' + message
    }

    if(program.logTime) {
      time = '[' + new Date().toLocaleString() + ']'
    }

    if(!grep || message.indexOf(grep) !== -1 || grep === group) {
      console.log( time + ' ' + chalk.blue(iconMap[messageType]) + ' ' +  chalk[color](message));
    }
  },
  info: function() {
    this.printMessage('info', 'blue', arguments);
  },
}