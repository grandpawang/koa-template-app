import koa = require('koa')
import { httpLog } from "lib/log"

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
  httpLog.info(`${ctx.url}\t${responseTime}ms`);
}

export default expansLog
