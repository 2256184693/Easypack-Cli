/**
 * @description log with spinner
 */

import * as ora from 'ora'

import * as chalk from 'chalk'

const spinner = ora()

interface SpinnerOpt {
  text: string;
  symbol: string;
}

let prevSpinner: SpinnerOpt | null;

export const start = (text: string, symbol = chalk.green('√')) => {
  if (prevSpinner) {
    spinner.stopAndPersist({
      text: prevSpinner.text,
      symbol: prevSpinner.symbol
    })
  }
  prevSpinner = {
    text,
    symbol
  }
  spinner.start()
}

export const succeed = () => {
  if (prevSpinner) {
    spinner.stopAndPersist({
      text: prevSpinner.text,
      symbol: prevSpinner.symbol
    })
  } else {
    spinner.stop()
  }
  prevSpinner = null
}

export const fail = (text?: string) => {
  spinner.fail(text)
  prevSpinner = null
}
