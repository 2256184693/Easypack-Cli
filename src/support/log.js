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
  'detail'  : '❄',
  'log'     : '',
}

module.exports = {
  namespace: function(name) {
    var log = Object.create(this)
    log.__namespace = name
    return log
  },
  print: function(messageType, color, ignoreNamespace, message) {
    const grep = program.grep
    let time = ''
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
      console.log( time + ' ' + chalk.blue(iconMap[messageType]) + ' ' +  chalk[color](message))
    }
  },
  log: function(message, color = 'green') {
    this.print('log', color, message)
  },
  info: function() {
    this.print('info', 'blue', arguments)
  },
  warn: function() {
    this.print('warn', 'yellow', arguments)
  },
  error: function(err) {
    var errType = Object.prototype.toString.call(err);

    if(errType === '[object Error]') {
      this.print('error', 'red', err.message)
      if(program.detail) {
        this.print('error', 'red', true, err.stack)
      }
    }else {
      this.print('eror', 'red', arguments)
    }
    this.print('error')
  }
}
