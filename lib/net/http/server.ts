import Koa = require("koa")

import core from "./middleware/core"
import authenticate from "./middleware/authenticate"
import log from "./middleware/log"

export interface Config {
  Host?: string;
  Port?: number;
}

/**
 * 新建http服务
 */
export function New() {
  const engine = new Koa(); // 新建一个koa应用

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
}
