import { Field, ID } from "type-graphql";
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column()
  emoji!: string;
}
