import * as koa from 'koa'


export async function test2(ctx: koa.Context, next: koa.Next) {

  ctx.body = { code: 1, message: { data: "test2" } }
  await next()
}
