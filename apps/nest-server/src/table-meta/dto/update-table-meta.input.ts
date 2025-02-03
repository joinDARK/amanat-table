import { CreateTableMetaInput } from './create-table-meta.input';
import { InputType, PartialType, Field, Float } from '@nestjs/graphql';

@InputType()
export class UpdateTableMetaInput extends PartialType(CreateTableMetaInput) {
  // Можно переопределить поля при необходимости
  @Field({ nullable: true })
  name?: string;

  @Field(() => Float, { nullable: true })
  order?: number;
}
