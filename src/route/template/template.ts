import { ecode } from "lib/ecode/common_ecode"
import { Context, Next } from "lib/net/http/context"
import { TemplateServices } from ".";

export default (_: TemplateServices) => ({
  /**
    * template add
  */
  add: (c: Context, next: Next) => {
    // 获取参数 参数校验
    const params: template.add = c.request.body
    console.log(c.validate("template.add", params))
    c.json(ecode.OK, "test2", next)
  },

  /**
    * template first
  */
  first: (c: Context, next: Next) => {
    // 获取参数
    const params: template.first = c.query
    console.log(c.validate("template.first", params))
    // 参数校验
    c.json(ecode.OK, "test2", next)
  }
})
