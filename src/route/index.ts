import Koa = require("koa");

import template = require("./template")
import http = require("lib/net/http/server")
import conf = require("src/conf/index")
import { system } from "lib/log"
import chalk = require('chalk');

export function Init(c: conf.Config) {
  system.info(chalk.gray("loading route..."))
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
        system.info(`${chalk.bgCyan(route.methods.join("|"))}\t${chalk.yellow(route.path)}`)
      });

      engine.use(routes.routes())
      engine.use(routes.allowedMethods())
    })
  system.info(chalk.green("load route ok"))
}
