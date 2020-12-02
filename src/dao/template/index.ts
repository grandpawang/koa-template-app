import conf = require("src/conf")
import template from "./template"

/**
 * dao
 */
export interface DaoContext {
  db: number; // TODO 数据库
}

/**
 * 新建一个Dao对象
 * @param c Dao配置
 */
export function New(_: conf.Config) {
  // TODO 初始化服务

  // TODO 初始化dao
  const dao: DaoContext = {
    db: 100,
  }

  return {
    template: template(dao),
  }
}
