import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTableMetaInput {
  @Field()
  baseId: string;

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
}
