import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { TableMeta } from '../../table-meta/entities/table-meta.entity';

@ObjectType()
export class Record {
  @Field()
  id: string;

  @Field(() => GraphQLJSON, { nullable: true })
  data?: any;

  @Field()
  createdTime: Date;

  @Field()
  createdBy: string;

  @Field({ nullable: true })
  lastModifiedTime?: Date;

  @Field({ nullable: true })
  lastModifiedBy?: string;

  @Field(() => TableMeta, { nullable: true })
  table?: TableMeta;
}
