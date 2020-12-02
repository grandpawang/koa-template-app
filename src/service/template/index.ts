import templateDao = require("src/dao/template")
import template from "./template"
import conf = require("src/conf")

/**
 * service上下文 依赖的dao
 */
export interface ServiceContext {
  template: ReturnType<typeof templateDao.New>;
}


/**
 * 新建一个Dao对象
 * @param c Dao配置
 */
export function New(c: conf.Config) {
  // 初始化服务
  const service: ServiceContext = {
    template: templateDao.New(c),
  }

  return {
    template: template(service)
  }
}
