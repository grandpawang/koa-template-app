import chalk = require("chalk")
import leven from "leven"
import { ArgsOptions } from "./types"
import { program, Command } from "commander";
/**
 * 添加commander的错误内容
 */
export const enhanceErrorMessages = (methodName: string, log: (...args: any[]) => string) => {
  program.Command.prototype[methodName] = function (...args: any[]) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    this.outputHelp()
    console.log(`  ` + chalk.red(log(...args)))
    console.log()
    process.exit(1)
  }
}

/**
 * 加载commander action部分
 * @param commandName 命令名称
 * @param moduleName 包名称
 */
export function loadCommand(commandName: string, moduleName: string) {
  const isNotFoundError = (err: { message: string }) => {
    return err.message.match(/Cannot find module/)
  }
  try {
    return require(moduleName)
  } catch (err) {
    if (isNotFoundError(err)) {
      // 没发现模块
      console.log()
      console.log(`  Command ${chalk.cyan(`${commandName}`)} requires a global addon to be installed.\n`)
      console.log()
      process.exit(1)
    } else {
      throw err
    }
  }
}

/**
 * 将实际options提取到object中
 * @param cmd 命令
 */
export function cleanArgs(cmd: Command): ArgsOptions {
  // 去除 --字符
  function camelize(str: string) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
  }

  const args = {} as ArgsOptions
  cmd.options.forEach((o: any) => {
    const key = camelize(o.long.replace(/^--/, ''))
    // 如果不存在选项，并且Command具有相同名称的方法 不应复制
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

/**
 * 输入提示建议
 * 检查两个字符串之间的差异
 */
export function suggestCommands(availableCommands: string[], unknownCommand: string) {

  let suggestion: string = "";

  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd
    }
  })

  if (suggestion) {
    console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
  }
}
