import Router = require('koa-router');

import template = require("./template")

/**
 * 依赖服务
 */
interface TemplateServices {
  templateService: number;
}

// 单例对象
export let templateServices: TemplateServices;

/**
 * 创建单例服务对象
 */
export function Init() {
  templateServices = {
    templateService: 10
  }
}

/**
 * 创建路由
 */
export function route() {
  const router: Router = new Router({ prefix: '/test' });
  router.get("/test2", template.test2)

  return router
}
