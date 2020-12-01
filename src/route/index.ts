import template = require("./template")
import http = require("lib/net/http/server")
import conf = require("src/conf/index")

export function Init(c: conf.Config) {
  const server = new http.Http(c.HTTP)
  // TODO 初始化依赖服务
  // 初始化路由
  template.Init()
  route(server)
  listen(server)
  server.Init()
}

// 注册路由
function route(server: http.Http){
  template.route(server.router)
}

// 注册监听
function listen(_: http.Http){

}
