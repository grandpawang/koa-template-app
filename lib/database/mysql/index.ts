import chalk from "chalk";
import { system, httpLog } from "lib/log";
import { Connection, createConnection } from "typeorm";
import { BaseConnectionOptions } from "typeorm/connection/BaseConnectionOptions";

/**
 * 数据库配置
*/
export interface Config {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

/**
 * 默认配置
*/
export const defaultConfig = {
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "config_center"
}

/**
 * orm数据实体
*/
export type ORM = Connection

// 单例对象
// let _instance: ORM;

/**
 * 新建orm对象
*/
export async function New(
  c: Config,
  entities: NonNullable<BaseConnectionOptions["entities"]>,
  synchronize?: boolean) {
  // if(_instance) return _instance
  try {
    system.info(chalk.gray("loading mysql..."))
    // 配置ORM
    const conn = await createConnection({
      type: "mysql",
      name: "mysql",
      database: c.database,
      host: c.host,
      username: c.username,
      password: c.password,
      entities: entities,
      synchronize: synchronize,
    });
    // _instance = conn;
    system.info(chalk.green("load mysql"))
    return conn
  } catch(err) {
    httpLog.error(err)
    throw err
    // return err
  }
}
