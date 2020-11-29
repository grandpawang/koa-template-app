import Koa = require("koa")

export async function test2(ctx: Koa.Context, next: Koa.Next) {

  ctx.body = { code: 1, message: { data: "test2" } }

  await next()
}
