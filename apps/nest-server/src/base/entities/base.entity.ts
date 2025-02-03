import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Space } from '../../sapce/entities/sapce.entity';
import { TableMeta } from '../../table-meta/entities/table-meta.entity';

@ObjectType()
export class Base {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  spaceId: string;

  @Field(() => Space)
  space: Space;

  @Field(() => [TableMeta], { nullable: true })
  tables?: TableMeta[];

  @Field()
  order: number;

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