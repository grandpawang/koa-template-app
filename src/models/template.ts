/**
 * template数据库
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
