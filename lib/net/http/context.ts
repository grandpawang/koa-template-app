import Koa = require("koa")
import Ajv from "ajv"; // 换jsonschema
import {ecode} from "lib/ecode/common_ecode"
import { system } from "lib/log";
import chalk from "chalk";

export type Context = Koa.Context;

export type Next = Koa.Next;


export function defineContextFunction(engine: Koa<Koa.DefaultState, Koa.Context>, schema: object | object[]){

  /**
   * ⭐ 格式化放回
   */
  engine.context.json = async function(ecode:ecode, data:any, next: Koa.Next) {
    this.body = {
      code: ecode,
      meseage: "",
      data: data
    }
    await next()
  }


  /**
   * ⭐ 加载字段校验模块
  */
  function ajvAddSchema(ajv: Ajv.Ajv,schema: object) {
    Object.keys(schema["definitions"]).forEach((key:string) => {
      const jsonSchema = schema["definitions"][key]
      ajv.addSchema(jsonSchema, key)
      system.info(chalk.blueBright(`add json schema ${chalk.yellow(key)}`))
    })
  }

  const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    schemaId: "auto",
  })
  system.info(chalk.gray(`loading json schema...`))
  if(schema instanceof Array) {
    schema.forEach(el => ajvAddSchema(ajv, el))
  } else {
    ajvAddSchema(ajv, schema)
  }
  system.info(chalk.green("load json schema ok"))

  engine.context.validate = function<T>(path:string, data:T) {
    const validate = ajv.getSchema(path)
    if(validate) {
      if(validate(data)) {
        return data
      } else {
        return (validate.errors as Ajv.ErrorObject[])
      }
    } else {
      throw new Error("this path can't find the validate schema.");
    }
  }
}
