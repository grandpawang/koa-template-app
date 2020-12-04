import Koa = require("koa")
import bodyParser = require("koa-bodyparser");
import core from "./middleware/core"
import authenticate from "./middleware/authenticate"
import log from "./middleware/log"
import { system } from "lib/log"
import chalk = require('chalk')
import { defineContextFunction } from "./context"
import { Router, defineRouterFunction } from "./route"
import { Server, createServer as httpCreateServer } from 'http'

/**
 * Http 配置
 */
export interface Config {
  host?: string;
  port?: number;
}

/**
 * http服务
 */
export interface HttpServe {
  config: Config;
  server: Server;
  router: Router<Koa.DefaultState, Koa.Context>;
  engine: Koa<Koa.DefaultState, Koa.Context>;
}

/**
 * 创建http服务
 */
export function createServer(c: Config): HttpServe {
  const config = c
  const engine = new Koa<Koa.DefaultState, Koa.Context>(); // 新建一个koa应用
  const router = new Router<Koa.DefaultState, Koa.Context>(); // 新建一个koa router
  // 定义koa http response
  defineContextFunction(engine)
  // 定义koa route
  defineRouterFunction(router)
  // 跨域
  engine.use(core)
  // 认证
  engine.use(authenticate)
  // 日志
  engine.use(log)
  // 参数解析
  engine.use(bodyParser())
  // 使用http server
  const server = httpCreateServer(engine.callback())

  return {
    config,
    server,
    router,
    engine,
  }
}

 /**
   * 初始化http服务
  */
export function Init({engine, config, router, server }:HttpServe) {
  engine.use(router.routes())
  engine.use(router.allowedMethods())
  server.listen(config.port,config.host)
  system.info(chalk.green(`http server ${chalk.blue(`http://${config.host || "localhost"}:${config.port}`)}`))
}
