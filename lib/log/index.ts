import chalk from "chalk";
import log4js = require("log4js");

export let httpLog: log4js.Logger;

export function Init(opts: ArgsOptions) {
  log4js.configure({
    appenders: {
      console: {
        type: "stdout",
      },
      httpLog: {
        type: "dateFile",
        encoding: "utf-8",
        filename: opts["logfile"] || "logs/server-log",
        layout: {
          type: "pattern",
          pattern: '{"date":"%d","level":"%p","data":\'%m\'}'
        },
        pattern: "yyyy-MM-dd.log",
        alwaysIncludePattern: true,
      },
    },
    categories: { default: { appenders: ["httpLog", "console"], level: "info" } }
  });

  httpLog = log4js.getLogger("httpLog");
}


export const system = {
  info: (message?: any, ...optionalParams: any[]) => {
    console.log(chalk.grey("[INFO]"), message, ...optionalParams)
  }
}
