import Koa = require("koa")
import {ecode} from "lib/ecode/common_ecode"

export type Context = Koa.Context;

export type Next = Koa.Next;

export function defineContextFunction(engine: Koa<Koa.DefaultState, Koa.Context>){
  engine.context.json = async function(ecode:ecode, data:any, next: Koa.Next) {
    this.body = {
      code: ecode,
      meseage: "",
      data: data
    }
    await next()
  }
}
