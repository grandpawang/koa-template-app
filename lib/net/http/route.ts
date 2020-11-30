import Koa = require("koa")
import koaRouter = require('koa-router');
import { Context } from "./context";
import { State } from "./state";
import { system } from "lib/log"
import chalk = require('chalk');

// route
export class Router<StateT = State, CustomT = Context> extends koaRouter<StateT, CustomT> {

  /**
   * app注册路由
  */
  engine(engine: Koa){
    this.stack.forEach(route => {
        system.info(`${route.methods.map(methods => chalk.blueBright(methods)).join(chalk.yellow(" | "))}\t${chalk.yellow(route.path)}`)
    })
    engine.use(this.routes())
    engine.use(this.allowedMethods())
  }
}

