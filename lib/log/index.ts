import chalk = require('chalk');
import log4js = require('log4js');

export let log: log4js.Logger;

export function Init(opts: Record<string, any>) {
  log4js.configure({
    appenders: {
      console: {
        type: 'stdout',
      },
      cheese: {
        type: 'dateFile',
        encoding: 'utf-8',
        filename: opts["logfile"] || 'logs/server-log',
        layout: {
          type: "pattern",
          pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
        },
        pattern: "yyyy-MM-dd.log",
        alwaysIncludePattern: true,
      },
    },
    categories: { default: { appenders: ['cheese', 'console'], level: 'info' } }
  });

  log = log4js.getLogger('cheese');
}


export const system = {
  info: (message?: any, ...optionalParams: any[]) => {
    console.log(chalk.grey("[INFO]"), message, ...optionalParams)
  }
}
