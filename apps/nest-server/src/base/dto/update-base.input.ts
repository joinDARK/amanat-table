import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateBaseInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  order?: number;

  @Field({ nullable: true })
  lastModifiedBy?: string;
}