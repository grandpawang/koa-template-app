import Koa = require("koa");

/**
 * 登录认证
 */
// TODO 登录认证
export default async function (ctx: Koa.Context, next: Function) {
  console.log(ctx);

  await next();
}
