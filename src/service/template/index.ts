import templateDao = require("src/dao/template")
import template from "./template"
import conf = require("src/conf")
// import { NonPromise } from "lib/types";

/**
 * service上下文 依赖的dao
 */
export interface ServiceContext {
  template: NonPromise<ReturnType<typeof templateDao.New>>;
}


/**
 * 新建一个Dao对象
 * @param c Dao配置
 */
export async function New(c: conf.Config) {
  const templateDAO = await templateDao.New(c);

  // 初始化服务
  const service: ServiceContext = {
    template: templateDAO,
  }

  return {
    template: template(service)
  }
}
