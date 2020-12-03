import template = require("./template")
import http = require("lib/net/http/server")
import conf = require("src/conf/index")

/**
 * 初始化路由并启动路由对应服务 [http, websocket, ...]
 * @param c 配置
 */
export function Init(c: conf.Config) {
  const server = http.createServer(c.HTTP)
  // 初始化依赖服务
  template.Init(c)
  // 初始化路由
  route(server)
  listen(server)
  http.Init(server)
}

// 注册路由
function route(server: http.HttpServe){
  template.route(server.router)
}

// 注册监听
function listen(_: http.HttpServe){

}
