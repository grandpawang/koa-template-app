import chalk from "chalk"
import logger = require("../lib/log")
import config = require("../src/conf")
import router = require("../src/route")

export default function main(opts: ArgsOptions) {
  const start = Date.now()
  // log init
  logger.Init(opts)
  // config init
  config.Init(opts)
  // TODO ecode init
  // TODO service init
  // http init
  router.Init(config.Conf)
  logger.system.info(chalk.green(`up server ok ${chalk.yellow(Date.now() - start + "ms")}`))
}
