import { ecode } from "lib/ecode/common_ecode"
import { Context, Next } from "lib/net/http/context"
import { TemplateServices } from ".";
import types = require("./template.types")

export default (_: TemplateServices) => ({
  /**
    * template add
  */
  add: (c: Context, next: Next) => {
    // 获取参数 参数校验
    const params: types.add = c.request.body
    console.log("post", params)
    c.json(ecode.OK, "test2", next)
  },

  /**
    * template first
  */
  first: (c: Context, next: Next) => {
    // 获取参数
    const params: types.first = c.query
    console.log("get", params)
    // 参数校验
    c.json(ecode.OK, "test2", next)
  }
})
