import Koa = require("koa")

import core from "./middleware/core"
import authenticate from "./middleware/authenticate"
import log from "./middleware/log"
import { system } from "lib/log"
import chalk = require('chalk')
import { defineContextFunction } from "./context"
import { Router, defineRouterFunction } from "./route"

export interface Config {
  Host?: string;
  Port?: number;
}

/**
 * 新建http服务
 */
export class Http {
  public config: Config;
  public engine: Koa<Koa.DefaultState, Koa.DefaultContext>;
  public router: Router<Koa.DefaultState, Koa.Context>;

  constructor(c: Config){
    this.config = c
    this.engine = new Koa(); // 新建一个koa应用
    this.router = new Router(); // 新建一个koa router
    // 定义koa返回
    defineContextFunction(this.engine)
    // 定义koa route
    defineRouterFunction(this.router)
    // 跨域
    this.engine.use(core)
    // 认证
    this.engine.use(authenticate)
    // 日志
    this.engine.use(log)
  }

  /**
   * 初始化http服务
  */
  Init() {
    this.engine.use(this.router.routes())
    this.engine.use(this.router.allowedMethods())
    this.engine.listen(this.config.Port,this.config.Host)
    system.info(chalk.green(`http server ${chalk.blue(`http://${this.config.Host || "localhost"}:${this.config.Port}`)}`))
  }
}
