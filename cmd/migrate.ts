import orm = require("../lib/database/orm");
import config = require("../src/conf");
import mysql = require("mysql")
import {system} from "../lib/log"

function query(conn:mysql.Connection, sql: string): Promise<Array<any>> {
  return new Promise((resolve,reject) => {
    conn.query(sql, (err, res, _) => {
      if(err) {
        system.info("exec sql error");
        reject(err)
        return;
      }
      resolve(res)
    })
  })
}

export default async function migrate(opts: ArgsOptions){
  // config init
  const conf = config.Init(opts)

  const c:orm.Config = conf.ORM
  const conn = mysql.createConnection({
    host: c.host,
    port: c.port,
    user: c.username,
    password: c.password,
  })

  conn.connect((err) => {
    if (err) {
      system.info("connect error");
      return;
    }
    system.info('connect succeed');
    return
  });

  try{
    const databases = await query(conn, "SHOW DATABASES")

    const hadDatabase = databases.some((database: any) => database.Database === c.database)
    if(!hadDatabase) {
      system.info("new database", c.database)
      await query(conn, `CREATE DATABASE ${c.database};`)
    }
    system.info("migrate table")
    // ORM init and migrate models
    const ormConn = await orm.New(config.Conf.ORM, require("../src/models").default, true)
    ormConn.close()
  } catch(err) {
    system.info(err)
  }
  // 关闭连接
  conn.end(function (err) {
    if (err) {
      return;
    }
    system.info('connect closed');
  });

}
