import { Router } from "lib/net/http/route"
import template = require("./template")
import templateSvr = require("src/service/template")
import conf = require("src/conf")

/**
 * 依赖服务
 */
interface TemplateServices {
  templateService: ReturnType<typeof templateSvr.New>;
}

// 单例对象
export let templateServices: TemplateServices;

/**
 * 创建单例服务对象
 */
export function Init(c: conf.Config) {
  templateServices = {
    templateService: templateSvr.New(c)
  }
}

/**
 * 创建路由
 */
export function route(router: Router) {
  router.prefix("/test")
  router.get("/test", template.test2)
  router.get("/test2", template.test2)
}
