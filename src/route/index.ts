import template = require("./template")
import http = require("lib/net/http/server")
import conf = require("src/conf/index")

export function Init(c: conf.Config) {
  const engine = http.New()
  template.Init()
  template.route().engine(engine)
  http.Init(c.HTTP, engine)
}
