import koa = require("koa")
import koaRouter = require('koa-router');

// route
export class Router<StateT = koa.DefaultState, CustomT = koa.DefaultContext> extends koaRouter<StateT, CustomT> { }

