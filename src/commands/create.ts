const program = require('commander')

import * as inquirer from 'inquirer'

import * as path from 'path'

import * as fs from 'fs-extra'

import log from '../utils/log'

import {
  start,
  succeed,
  fail
} from '../utils/spinner'

const clearDicretory = (targetDir: string) => {
  start('Cleaning directory...')
  try {
    fs.removeSync(targetDir)
    succeed()
  } catch (e) {
    fail()
    log.error(e)
  }
}

const create =  async (name: string, args: any) => {
  if(program.debug) {
    log.out(name, args)
  }
  const cwd = args.cwd || process.cwd()
  const isCurrent = name === '.'
  const projectName = isCurrent ? path.relative('../', cwd) : name
  const targetDir = isCurrent ? cwd : path.resolve(cwd, projectName)

  if(fs.existsSync(targetDir)) {
    if(args.force) {
      clearDicretory(targetDir)
    }else{
      if(!isCurrent) {
        const { mode } = await inquirer.prompt([
          {
            name: 'mode',
            type: 'list',
            message: `Target directory already exists. Choose an handle mode:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite'},
              { name: 'Merge', value: 'merge'},
              { name: 'Cancel', value: ''},
            ]
          }
        ])
        if(!mode) {
          return false;
        }
        if(mode === 'overwrite') {
          clearDicretory(targetDir)
        }
      }
    }
  }

  // new Creator(name, targetDir);
}

export default (name: string, args: any) => {
  return create(name, args).catch(e => {
    process.exit(1)
  })
}
