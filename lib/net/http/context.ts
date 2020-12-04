import Koa = require("koa")
import Ajv = require("ajv")
import {ecode} from "lib/ecode/common_ecode"

export type Context = Koa.Context;

export type Next = Koa.Next;


export function defineContextFunction(engine: Koa<Koa.DefaultState, Koa.Context>, schema: boolean | object){

  engine.context.json = async function(ecode:ecode, data:any, next: Koa.Next) {
    this.body = {
      code: ecode,
      meseage: "",
      data: data
    }
    await next()
  }


  // 加载字段校验模块
  const ajv = new Ajv()
  const validate = ajv.compile(schema)

  engine.context.validate = function<T>(data:T) {
    if(validate(data)) {
      return data
    } else {
      return (validate.errors as Ajv.ErrorObject[])
    }
  }
}
