/**
 * log
 *
 * Created By SH
 */

const program = require('commander');

const chalk = require('chalk');

const iconMap = {
  'success': '✔',
  'warn': '⚠',
  'info': 'ℹ',
  'debug': '➤',
  'error': '✘',
  'log': ''
};

module.exports = {
  namespace: function(name) {
    let log = Object.create(this);
    log.__namespace = name;
    return log;
  },
  log: function(message, color = 'blue') {
    this.print('log', message, color);
  },
  success: function(message) {
    this.print('success', message, 'green');
  },
  warn: function(message) {
    this.print('warn', message, 'yellow');
  },
  info: function(message) {
    this.print('info', message, 'blue');
  },
  error: function(message) {
    if(Object.prototype.toString.call(message) === '[object Error]') {
      this.print('error', message.message, 'red');
    }else {
      this.print('error', message, 'red');
    }
  },
  print(messageType, message, color) {
    if(typeof message === 'object') {
      message = Array.prototype.join.call(message, ' ');
    }
    console.log(`[${new Date().toLocaleString()}]: ${chalk[color](iconMap[messageType])} ${chalk[color](message)}`);
  }
}