import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Column {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}