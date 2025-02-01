import { InputType, Field, Float, PartialType } from '@nestjs/graphql';
import { CreateColumnInput } from './create-column.input';
import {
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

@InputType()
export class UpdateColumnInput extends PartialType(CreateColumnInput) {
  // Можно переопределить или расширить поля, если нужно
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  notNull?: boolean;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  order?: number;
}
