import templateDao = require("src/dao/template")
import template from "./template"

/**
 * template service 配置项目
 */
export interface Config {
  template: templateDao.Config;
}

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
export function New(c: Config) {
  // 初始化服务
  const service: ServiceContext = {
    template: templateDao.New(c.template),
  }

  return {
    template: template(service)
  }
}
