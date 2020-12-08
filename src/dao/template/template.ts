import { Template } from "src/models/template";
import { TemplateMongo } from "src/models/templateMongo";
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
    // test mysql
    const template = new Template()
    template.name = name
    template.description = description
    const res = await dao.mysql.manager.save(template)
    console.log("test mysql", res)
    // test mongo
    const templateMongo = new TemplateMongo()
    templateMongo.name = name
    templateMongo.description = description
    const resMongo = await dao.mongo.manager.save(templateMongo)
    console.log("test mongo", resMongo)
  },

  /**
   * template first
   */
  first: async (name: string) => {
    // test mysql
    const template = await dao.mysql.getRepository(Template).findOne({name})
    console.log("test mysql", template);
    // test mongo
    const templateMongo = await dao.mongo.getRepository(TemplateMongo).findOne({name})
    console.log("test mongo", templateMongo);
    return template
  }
})

