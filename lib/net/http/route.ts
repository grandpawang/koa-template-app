import koaRouter = require('koa-router');
import { Context } from "./context";
import { State } from "./state";

// route
export class Router<StateT = State, CustomT = Context> extends koaRouter<StateT, CustomT> {


}

