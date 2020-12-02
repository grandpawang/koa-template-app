import template from "./template"

/**
 * template dao 配置项目
 */
export interface Config {

}

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
export function New(c: Config) {
  // TODO 初始化服务

  // TODO 初始化dao
  const dao: DaoContext = {
    db: 100,
  }

  return {
    template: template(dao),
  }
}
