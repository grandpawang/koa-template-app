import conf = require("src/conf")
import template from "./template"
import mysql = require("lib/database/mysql")
import mongo = require("lib/database/mongo")
import models = require("src/models")
/**
 * dao
 */
export interface DaoContext {
  mysql: mysql.ORM; // mysql 数据库
  mongo: mongo.ORM; // mongo 数据库
}

/**
 * 新建一个Dao对象
 * @param c Dao配置
 */
export async function New(c: conf.Config) {
  // 初始化mysql服务
  const ormLib = await mysql.New(c.MYSQL, models.mysql)
  // 初始化mongodb服务
  const mongoLib = await mongo.New(c.MONGODB, models.mongo)

  // 初始化dao
  const dao: DaoContext = {
    mysql: ormLib,
    mongo: mongoLib,
  }

  return {
    template: template(dao),
  }
}
