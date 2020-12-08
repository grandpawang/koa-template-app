/**
 * templateMongo mongodb数据库
 * 参考定义
 * https://github.com/typeorm/typeorm/blob/master/docs/mongodb.md
*/
import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";


@Entity()
export class TemplateMongo {

    @ObjectIdColumn()
    id!: ObjectID;

    @Column()
    name!: string;

    @Column()
    description!: string;

}
