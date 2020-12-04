import template = require("./template")
import http = require("lib/net/http/server")
import conf = require("src/conf/index")
import schema = require("src/static/schema.json")
/**
 * 初始化路由并启动路由对应服务 [http, websocket, ...]
 * @param c 配置
 */
export function Init(c: conf.Config) {
  const server = http.createServer(c.HTTP, schema)
  route(c, server)
  listen(server)
  http.Init(server)
}

// 注册路由
function route(c: conf.Config, server: http.HttpServe){
  template.New(c, server.router)
}

// 注册监听
function listen(_: http.HttpServe){

}
