import { ArgsOptions } from "../lib/command/types";
import orm = require("../lib/database/orm");
import config = require("../src/conf");
import mysql = require("mysql")

function query(conn:mysql.Connection, sql: string): Promise<Array<any>> {
  return new Promise((resolve,reject) => {
    conn.query(sql, (err, res, _) => {
      if(err) {
        console.log("exec sql error");
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
      console.log("connect error");
      return;
    }
    console.log('connect succeed!');
    return
  });

  try{
    const databases = await query(conn, "SHOW DATABASES")

    const hadDatabase = databases.some((database: any) => database.Database === c.database)
    if(!hadDatabase) {
      await query(conn, `CREATE DATABASE ${c.database};`)
    }
    // ORM init and migrate models
    const ormConn = await orm.New(config.Conf.ORM, require("../src/models").default, true)
    ormConn.orm.close()
  } catch(err) {
    console.log(err)
  }
  // 关闭连接
  conn.end(function (err) {
  if (err) {
    return;
  }
  console.log('connect closed!');
});

}
