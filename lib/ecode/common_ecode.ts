export enum ecode {
  OK = 0,    // 正确
  SignCheckErr = -3,   // API校验密匙错误
  ParamsErr = -5,   // 参数错误
  NoLogin = -101, // 账号未登录
  RequestErr = -400, // 请求参数错误
  Unauthorized = -401, // 未认证
  AccessDenied = -403, // 访问权限不足
  NothingFound = -404, // 不存在该参数实体
  ServerErr = -500, // 服务器错误
  ServiceUnavailable = -503, // 过载保护服务暂不可用
  Deadline = -504, // 服务调用超时
  LimitExceed = -509, // 超出限制
  AccessTokenExpires = -658, // Token过期
  NotDelAsscoiation = -659, // 存在关联关系不能删除
}
