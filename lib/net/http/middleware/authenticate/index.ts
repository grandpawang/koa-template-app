import Koa = require("koa");

/**
 * 登录认证
 */
// TODO 登录认证
export default async function (ctx: Koa.Context, next: Koa.Next) {
  const token = ctx.request.get("token")
  if (token) {
    //
  }
  await next();
}
