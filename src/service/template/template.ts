import { ServiceContext } from ".";

/**
 * template service
 * @param s ServiceContext service上下文
 */
export default (s: ServiceContext) => ({
  /**
   * template add
   */
  add: async (name: string, description: string) => {
    await s.template.template.add(name, description);
  },

  /**
   * template first
  */
  first: async (name: string) => {
    return await s.template.template.first(name)
  },

})

