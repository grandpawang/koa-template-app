import Koa = require("Koa");

import template = require("./template")
import http = require("../../lib/net/http/server")
import conf = require("../conf/index")

export function Init(c: conf.Config) {
  const engine = http.New()
  template.Init()
  route(engine)
  console.log(engine);

  http.Init(c.HTTP, engine)
}

// 加载路由
function route(engine: Koa) {
  // 注册路由
  Array.from([template.route()])
    .forEach(route => {
      engine.use(route.routes())
      engine.use(route.allowedMethods())
    })
}
