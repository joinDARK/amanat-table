import { TableMeta } from '@/src/table-meta/entities/table-meta.entity';
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Column {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  options?: string;

  @Field()
  type: string;

  @Field()
  cellValueType: string;

  @Field({ nullable: true })
  isMultipleCellValue?: boolean;

  @Field()
  dbFieldType: string;

  @Field()
  dbFieldName: string;

  @Field({ nullable: true })
  notNull?: boolean;

  @Field({ nullable: true })
  unique?: boolean;

  @Field({ nullable: true })
  isPrimary?: boolean;

  @Field({ nullable: true })
  isComputed?: boolean;

  @Field({ nullable: true })
  isLookup?: boolean;

  @Field({ nullable: true })
  isPending?: boolean;

  @Field({ nullable: true })
  hasError?: boolean;

  @Field({ nullable: true })
  lookupLinkedFieldId?: string;

  @Field(() => Float)
  order: number;

  @Field()
  createdBy: string;

  @Field()
  createdTime: Date;

  @Field({ nullable: true })
  lastModifiedTime?: Date;

  @Field({ nullable: true })
  deletedTime?: Date;

  @Field({ nullable: true })
  lastModifiedBy?: string;

  @Field(() => TableMeta, { nullable: true })
  table?: TableMeta;
}
