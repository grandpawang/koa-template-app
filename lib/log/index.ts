import log4js = require('log4js');

export let log: log4js.Logger;

export function Init() {
  log4js.configure({
    appenders: {
      console: {
        type: 'stdout',
      },
      cheese: {
        type: 'dateFile',
        encoding: 'utf-8',
        filename: 'logs/globalLog',
        layout: {
          type: "pattern",
          pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
        },
        pattern: "-yyyy-MM-dd.log",
        alwaysIncludePattern: true,
      },
    },
    categories: { default: { appenders: ['cheese', 'console'], level: 'info' } }
  });

  log = log4js.getLogger('cheese');
}
