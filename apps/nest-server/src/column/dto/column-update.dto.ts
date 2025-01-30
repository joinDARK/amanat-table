import { CreateColumnInput } from './column-create.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateColumnInput extends PartialType(CreateColumnInput) {
  @Field(() => Int)
  id: number;
}