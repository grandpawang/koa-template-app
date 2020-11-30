import Koa = require("koa")

import core from "./middleware/core"
import authenticate from "./middleware/authenticate"
import log from "./middleware/log"
import { system } from "lib/log"
import chalk = require('chalk')
import { defineContextFunction } from "./context"
import { Router } from "./route"

export interface Config {
  Host?: string;
  Port?: number;
}

/**
 * 新建http服务
 */
class Http {
  public config: Config
  engine: Koa<Koa.DefaultState, Koa.DefaultContext>
  router: Router<Koa.DefaultState, Koa.Context>

  constructor(c: Config){
    this.config = c
    this.engine = new Koa(); // 新建一个koa应用
    this.router = new Router(); // 新建一个koa router
    // 定义koa返回
    defineContextFunction(this.engine)
    // 定义koa route

    // 跨域
    this.engine.use(core)
    // 认证
    this.engine.use(authenticate)
    // 日志
    this.engine.use(log)
  }

  start(){
    this.engine.use(this.router.routes())
    this.engine.use(this.router.allowedMethods())
    this.engine.listen(this.config.Host, this.config.Port)
    system.info(chalk.green(`http server ${chalk.blue(`http://${this.config.Host || "localhost"}:${this.config.Port}`)}`))
  }
}


export function New() {
  system.info(chalk.gray("http server init..."))
  const engine = new Koa(); // 新建一个koa应用
  const router = new Router(); // 新建一个koa router
  // 定义koa返回
  defineContextFunction(engine)
  // 定义koa route

  // 跨域
  engine.use(core)
  // 认证
  engine.use(authenticate)
  // 日志
  engine.use(log)
  // 鉴权 ...
  return engine
}

/**
 * 初始化http服务
 */
export function Init(c: Config, engine: Koa) {
  //用于监听socket的应用
  // const server = Http.createServer(engine.callback());

  // 启动服务
  engine.listen(c.Port, c.Host)
  system.info(chalk.green(`http server ${chalk.blue(`http://${c.Host || "localhost"}:${c.Port}`)}`))
}

