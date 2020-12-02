import { DaoContext } from ".";

/**
 * template dao
 * @param dao DaoContext dao上下文
 */
export default (dao: DaoContext) => ({
  /**
   * template add
   */
  add: () => {
    console.log(dao.db);
  }



})

