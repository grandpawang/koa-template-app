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
 * orm数据实体
*/
export type ORM = Connection

// 单例对象
let _instance: ORM;

/**
 * 新建orm对象
*/
export async function New(
  c: Config,
  entities: NonNullable<BaseConnectionOptions["entities"]>,
  synchronize?: boolean) {
  if(_instance) return _instance
  try {
    // 配置ORM
    const conn = await createConnection({
      type: "mysql",
      database: c.database,
      host: c.host,
      username: c.username,
      password: c.password,
      entities: entities,
      synchronize: synchronize,
    });
    _instance = conn;
    return conn
  } catch(err) {
    throw err
    // return err
  }
}
