import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSpaceInput {
  @Field(() => ID)
  id: string;

  @Field()
  lastModifiedBy: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  credit?: number;
}