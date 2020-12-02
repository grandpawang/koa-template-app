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
}

/**
 * orm配置
*/
export interface ORMConfig {
  _entities: BaseConnectionOptions["entities"]; // orm的实体
}

/**
 * orm数据实体
*/
export interface ORM {
  _opts: Config; // 数据库配置
  _ormOpts: ORMConfig; // orm配置
}


/**
 * 新建orm对象
*/
export function New(c: Config, ormC: ORMConfig): ORM {
  return {
    _opts: c,
    _ormOpts: ormC,
  }
}

/**
 * 执行orm数据库操作
*/
export async function exec<Fn extends ((conn: Connection) => any)>
  (orm: ORM, fn: Fn): Promise<ReturnType<Fn>> {
  try {
    const conn = await createConnection({
      type: "mysql",
      host: orm._opts.host,
      username: orm._opts.username,
      password: orm._opts.password,
      entities: orm._ormOpts._entities,
    });
    return fn(conn);
  } catch (error) {
    return error;
  }
}

