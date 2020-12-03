import { Router } from "lib/net/http/route"
import template = require("./template")
import templateSvr = require("src/service/template")
import conf = require("src/conf")
import { NonPromise } from "lib/types";

/**
 * 依赖服务
 */
interface TemplateServices {
  template: NonPromise<ReturnType<typeof templateSvr.New>>;
}

// 单例对象
export let services: TemplateServices;

/**
 * 创建单例服务对象
 */
export async function Init(c: conf.Config) {
  const templateService = await templateSvr.New(c);
  services = {
    template: templateService,
  }
  console.log(services, templateService);

}

/**
 * 创建路由
 */
export function route(router: Router) {
  router.prefix("/template")
  router.post("/add", template.add)
  router.get("/first", template.first)
}
