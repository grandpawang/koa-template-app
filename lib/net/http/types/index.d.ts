/**
 * DefaultState 可以扩展 state
 * DefaultContext 可以扩展 context
 * https://blog.csdn.net/roamingcode/article/details/107084933
*/


declare module 'koa' {
  interface DefaultState {
    stateProperty: boolean;
  }

  interface DefaultContext {
    success: Function;
    error: Function;
  }
}
