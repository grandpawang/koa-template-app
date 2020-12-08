import code = require(".")

// 系统错误码
export const ecode = {
  OK: code.New(0, "正确"),
  SignCheckErr: code.New(-3, "API校验密匙错误"),
  ParamsErr: code.New(-5, "参数错误"),
  NoLogin: code.New(-101, "账号未登录"),
  RequestErr: code.New(-400, "请求参数错误"),
  Unauthorized: code.New(-401, "未认证"),
  AccessDenied: code.New(-403, "访问权限不足"),
  NothingFound: code.New(-404, "不存在该参数实体"),
  ServerErr: code.New(-500, "服务器错误"),
  ServiceUnavailable: code.New(-503, "过载保护服务暂不可用"),
  Deadline: code.New(-504, "服务调用超时"),
  LimitExceed: code.New(-509, "超出限制"),
  AccessTokenExpires: code.New(-658, "Token过期"),
  NotDelAsscoiation: code.New(-659, "存在关联关系不能删除"),
}
