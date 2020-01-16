/**
 * @description Log
 */

import * as chalk from 'chalk'

import * as program from 'commander'

import { type } from './tools'

export type LogLevel =
  | 'info'
  | 'success'
  | 'warn'
  | 'error'

export interface Log {
  __namespace?: string;
  namespace: Function;
  print: Function;
  info: Function;
  success: Function;
  warn: Function;
  error: Function;
}

export interface SpinnerOptions {
  text?: string;
  action: Function;
}

class Logger {
  private __namespace: string
  constructor(namespace: string = '') {
    this.__namespace = namespace
  }
  print(messageType: LogLevel, message: any, color: keyof chalk.Chalk) {
    if(type(message) === 'object') {
      message = JSON.stringify(message)
    }else if(type(message) === 'array') {
      message = message.join('\n')
    }
    let timeStr = '', name = ''
    if(program.timestamp) {
      timeStr = `[${new Date().toLocaleString()}]`
    }
    if(this.__namespace) {
      name = `[${this.__namespace}]`
    }
    console.log(
      chalk.gray(timeStr) +
      chalk.bgCyan(name) +
      (chalk[color] as chalk.Chalk)(message)
    )
  }
  info(message: any, color: keyof chalk.Chalk = 'cyan') {
    this.print('info', message, color)
  }
  success(message: any, color: keyof chalk.Chalk = 'green') {
    this.print('success', message, color)
  }
  warn(message: any, color: keyof chalk.Chalk = 'yellow') {
    this.print('info', message, color)
  }
  error(message: any, color: keyof chalk.Chalk = 'red') {
    this.print('info', message, color)
  }
  out(...messageList: any[]) {

    console.log(messageList.map((msg) => {
      if(type(msg) === 'object') {
        return JSON.stringify(msg, null, 2)
      }
      return msg
    }).join('\n'));
  }
}

export default new Logger();
