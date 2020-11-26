import logger = require("../lib/log")

import config = require("../src/conf")
import router = require("../src/route")


async function main() {
  // config init
  config.Init()
  // log init
  logger.Init()
  // TODO ecode init
  // TODO service init
  // http init
  router.Init(config.Conf)
  logger.log.info("up server ok")
}

main()

