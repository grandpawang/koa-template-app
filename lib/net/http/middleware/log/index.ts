import koa = require('koa')
import { log } from "lib/log"

/**
 * 额外输出log
 */
const expansLog = async (ctx: koa.Context, next: Function) => {
  // 记录请求开始的时间
  const startTime = Date.now();
  await next();
  // 记录完成的时间 作差 计算响应时间
  const execTime = Date.now()
  const responseTime = execTime - startTime;
  log.info(ctx.url, ` ${responseTime}ms`);
}

export default expansLog
