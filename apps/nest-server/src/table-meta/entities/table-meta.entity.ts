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

  // Если нужно вернуть связанные данные
  // (Например, Base или Fields), то добавляются
  // отдельные поля, также как @Field(() => Base) ...
}
