import { ServiceContext } from "./service";

/**
 * template service
 * @param s ServiceContext service上下文
 */
export default (s: ServiceContext) => ({
  /**
   * template add
   */
  add: () => {
    console.log(s.template.template.add());
  }

})

