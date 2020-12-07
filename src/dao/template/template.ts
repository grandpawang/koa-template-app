import { Template } from "src/models/template";
import { DaoContext } from ".";

/**
 * template dao
 * @param dao DaoContext dao上下文
 */
export default (dao: DaoContext) => ({
  /**
   * template add
   */
  add: async (name: string, description: string) => {
    let template = new Template()
    template.name = name
    template.description = description
    await dao.orm.manager.save(template)
  },

  /**
   * template first
   */
  first: async (name: string) => {
    let template = await dao.orm.getRepository(Template).findOne({name})
    console.log("dao", template);
    return template
  }
})

