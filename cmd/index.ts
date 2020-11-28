import chalk = require("chalk")
import logger = require("../lib/log")
import config = require("../src/conf")
import router = require("../src/route")


async function main() {
  const start = Date.now()
  // log init
  logger.Init()
  // config init
  config.Init()
  // TODO ecode init
  // TODO service init
  // http init
  router.Init(config.Conf)
  logger.system.info(chalk.green(`up server ok ${chalk.yellow(Date.now() - start + "ms")}`))
}

main()

