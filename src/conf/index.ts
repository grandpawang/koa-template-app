import mysql = require("lib/database/mysql")
import http = require("lib/net/http/server")
import mongodb = require("lib/database/mongo")
import { system } from "lib/log"
import chalk from "chalk";
import toml = require("toml")
import fs = require("fs")
import path = require("path")
/**
 * 全局配置项
 */
export interface Config {
  HTTP: http.Config;
  MYSQL: mysql.Config;
  MONGODB: mongodb.Config;
}

// 默认配置
const _defaultConfig: Config = {
  HTTP: http.defaultConfig,
  MYSQL: mysql.defaultConfig,
  MONGODB: mongodb.defaultConfig,
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
