import template = require("./template")
import http = require("lib/net/http/server")
import conf = require("src/conf/index")

export function Init(c: conf.Config) {
  const server = new http.Http(c.HTTP)
  template.Init()
  template.route(server.router)
  server.start()
  // http.Init(c.HTTP, engine)
}
