import conf = require("src/conf")
import template from "./template"
import orm = require("lib/database/orm")

/**
 * dao
 */
export interface DaoContext {
  orm: orm.ORM; // 数据库
}

/**
 * 新建一个Dao对象
 * @param c Dao配置
 */
export async function New(c: conf.Config) {
  // 初始化服务
  const ormLib = await orm.New(c.ORM, require("src/models").mysql)

  // 初始化dao
  const dao: DaoContext = {
    orm: ormLib,
  }

  return {
    template: template(dao),
  }
}
