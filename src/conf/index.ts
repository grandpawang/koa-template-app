import orm = require("lib/database/orm")
import http = require("lib/net/http/server")
import { system } from "lib/log"
import chalk = require('chalk');
import toml = require("toml")
import fs = require("fs")
import path = require("path")
/**
 * 全局配置项
 */
export interface Config {
  HTTP: http.Config;
  ORM: orm.Config;
}

// 默认配置
const _defaultConfig: Config = {
  HTTP: {
    host: "localhost",
    port: 80
  },
  ORM: {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "config_center"
  }
}

// 配置单例
export let Conf: Config;

/**
 * 加载本地配置
 */
function loadLocalConfig(opts: Record<string, any>) {
  system.info(chalk.gray("loading local config..."))

  // 默认值
  let configFileParse = _defaultConfig;
  try {
    const configFileContent = fs.readFileSync(path.resolve(process.cwd(), opts["config"] || "cmd/config.toml")).toString()
    configFileParse = Object.assign(configFileParse, toml.parse(configFileContent) as Config)
  } finally {
    Conf = configFileParse
  }
}

/**
 * 初始化配置中心
 */
export function Init(opts: ArgsOptions) {
  loadLocalConfig(opts)
  system.info(chalk.green("load config ok"))
  return Conf
}
