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
export interface ORM {
  orm: Connection
}


/**
 * 新建orm对象
*/
export async function New(
  c: Config,
  entities: NonNullable<BaseConnectionOptions["entities"]>,
  synchronize?: boolean) {
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

  return {
    orm: conn,
  }
}
