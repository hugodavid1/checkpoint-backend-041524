import { Field, ID, ObjectType } from "type-graphql";
import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field()
  @Column()
  code!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  emoji!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  continentCode?: string;
}

@ObjectType()
export class CountryResponse {
  @Field()
  message!: string;

  @Field()
  status!: boolean;
}
