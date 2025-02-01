import { Base } from '@/src/base/entities/base.entity';
import { Column } from '@/src/column/entities/column.entity';
import { Record } from '@/src/record/entities/record.entity';
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class TableMeta {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  dbTableName: string;

  @Field(() => Float)
  order: number;

  @Field()
  createdBy: string;

  @Field()
  createdTime: Date;

  @Field({ nullable: true })
  lastModifiedTime?: Date;

  @Field(() => Base, { nullable: true })
  base?: Base;

  @Field(() => [Column], { nullable: true })
  fields?: Column[];

  // Связанные записи
  @Field(() => [Record], { nullable: true })
  records?: Record[];
}
