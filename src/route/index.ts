import Koa = require("koa");

import template = require("./template")
import http = require("lib/net/http/server")
import conf = require("src/conf/index")
import { log } from "lib/log"
import chalk = require('chalk');

export function Init(c: conf.Config) {
  log.info(chalk.gray("loading route..."))
  const engine = http.New()
  template.Init()
  route(engine)
  http.Init(c.HTTP, engine)
}

// 加载路由
function route(engine: Koa) {
  // 注册路由
  Array.from([template.route()])
    .forEach(routes => {
      routes.stack.forEach(route => {
        log.info(`${chalk.bgCyan(route.methods.join("|"))}\t${chalk.yellow(route.path)}`)
      });

      engine.use(routes.routes())
      engine.use(routes.allowedMethods())
    })
  log.info(chalk.green("load route ok"))
}
