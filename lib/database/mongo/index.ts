import chalk from "chalk";
import { system } from "lib/log";
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
  port: 27017,
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
    // 配置ORM
    system.info(chalk.gray("loading mongodb..."))
    const conn = await createConnection({
      type: "mongodb",
      database: c.database,
      host: c.host,
      username: c.username,
      password: c.password,
      entities: entities,
      synchronize: synchronize,
    });
    system.info(chalk.green("load mongodb"))

    // _instance = conn;
    return conn
  } catch(err) {
    throw err
    // return err
  }
}
