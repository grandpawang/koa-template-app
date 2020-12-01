import chalk = require('chalk');
import koaRouter = require('koa-router');
import { system } from 'lib/log';
import { Context } from "./context";
import { State } from "./state";

// route
export class Router<StateT = State, CustomT = Context> extends koaRouter<StateT, CustomT> {


}


export function defineRouterFunction(router: Router){
  // 注册路由时执行
  Object.defineProperty(router, "register", {
    value: (...args: any) => {
      const route = Router.prototype.register.apply(router, args)
      system.info(
        `${chalk.yellow(route.path)}\t`,
        `${route.methods.map(methods => chalk.blueBright(methods)).join(chalk.yellow(" | "))}\t`,
      )
      return route
    }
  })
}
