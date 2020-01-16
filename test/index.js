
const ora = require('ora')

const chalk = require('chalk')

const spinner = ora()

let clear = false
// spinner.prefixText = '📄'

spinner.start('Loading...')

setTimeout(() => {
  spinner.stopAndPersist({
    text: 'Success',
    symbol: '📄'
  })
}, 5000)

