/**
 * template mysql数据库
 * 参考定义
 * https://gitee.com/mirrors/TypeORM
*/

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Template {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

}
