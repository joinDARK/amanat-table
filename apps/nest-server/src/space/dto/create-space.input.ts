import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSpaceInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  credit?: number;

  @Field()
  createdBy: string;
}