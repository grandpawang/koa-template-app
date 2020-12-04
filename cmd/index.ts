import { Command, program } from "commander";
import chalk = require("chalk")
import main from "./main"
import migrate from "./migrate"
import {
  suggestCommands,
  enhanceErrorMessages,
  cleanArgs
} from "../lib/command"

//////////////////////////run//////////////////////////////////////////


program
  .command('run')
  .option("-log, --logfile <logFile>", "日志输出路径", "logs/server-log")
  .option("-c, --config <configPath>", "配置文件位置", "cmd/config.toml")
  .description('启动koa服务')
  .action((cmd: Command) => {
    const options = cleanArgs(cmd)
    main(options)
  })

//////////////////////////migrate//////////////////////////////////////////

program
  .command('migrate')
  .description('同步数据库')
  .action((cmd: Command) => {
    const options = cleanArgs(cmd)
    migrate(options)
  })

//////////////////////////help//////////////////////////////////////////

/**
 * 输出未找到命令提示
 */
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`未找到命令 ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(program.commands.map(cmd => cmd._name), cmd)
  })

/**
 * help 命令
 */
// help 命令添加  [@cli <command> --help] 提示
program
  .on('--help', () => {
    console.log()
    console.log(`  运行 ${chalk.cyan(`@cli <command> --help`)} 查看命令的详细用法.`)
    console.log()
  })

// 所有命令添加--help
program.commands.forEach(c => c.on('--help', () => console.log()))

/**
 * 添加错误提示
 */
enhanceErrorMessages('missingArgument', argName => {
  return `缺少必需的参数 ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `未知选项 ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `缺少选项的必需参数 ${chalk.yellow(option.flags)}` + (flag ? `, got ${chalk.yellow(flag)} ` : ``)
})

program.parse(process.argv)

// 命令没有参数
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
