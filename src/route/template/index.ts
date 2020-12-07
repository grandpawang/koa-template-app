import { Router } from "lib/net/http/route"
import templateSvr = require("src/service/template")
import conf = require("src/conf")

/**
 * 依赖服务
 */
export interface services {
  template: NonPromise<ReturnType<typeof templateSvr.New>>;
}

/**
 * 创建路由
 */
export async function New(c: conf.Config, router: Router) {
  const templateService = await templateSvr.New(c);
  // 初始化服务
  const services: services = {
    template: templateService
  }
  // 初始化路由
  const templateRoute = (await import("./template")).default(services)

  // 生成路由表
  router.prefix("/template")
  router.post("/add", templateRoute.add)
  router.get("/first", templateRoute.first)
}
