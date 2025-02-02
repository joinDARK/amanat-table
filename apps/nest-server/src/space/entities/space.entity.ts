import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Base } from '../../base/entities/base.entity';

@ObjectType()
export class Space {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Base], { nullable: true })
  baseGroup?: Base[];

  @Field({ nullable: true })
  credit?: number;

  @Field({ nullable: true })
  deletedTime?: Date;

  @Field()
  createdTime: Date;

  @Field()
  createdBy: string;

  @Field({ nullable: true })
  lastModifiedBy?: string;

  @Field({ nullable: true })
  lastModifiedTime?: Date;
}