import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBaseInput {
  @Field()
  name: string;

  @Field()
  spaceId: string;

  @Field()
  createdBy: string;

  @Field({ nullable: true })
  order: number;
}