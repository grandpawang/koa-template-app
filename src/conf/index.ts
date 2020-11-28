import http = require("lib/net/http/server")
import { system } from "lib/log"
import chalk = require('chalk');

/**
 * 全局配置项
 */
export interface Config {
  HTTP: http.Config;
}

// 配置单例
export let Conf: Config;

/**
 * 加载本地配置
 */
function loadLocalConfig() {
  system.info(chalk.gray("loading local config..."))
  Conf = {
    HTTP: {
      Port: 80,
    }
  }
}

/**
 * 初始化配置中心
 */
export function Init() {
  loadLocalConfig()
  system.info(chalk.green("load config ok"))
}
