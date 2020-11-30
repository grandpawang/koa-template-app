/**
 * DefaultState 可以扩展 state
 * DefaultContext 可以扩展 context
 * https://blog.csdn.net/roamingcode/article/details/107084933
*/
import Koa from "koa"
import {ecode} from "lib/ecode/common_ecode"

declare module 'koa' {
  interface DefaultState  {
  }

  /**
   * 格式化json输出
  */
  interface DefaultContext{
    json: (ecode:ecode, data:any, next: Koa.Next) => void;
  }
}
