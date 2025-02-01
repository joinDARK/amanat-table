import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateRecordInput } from './create-record.input';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateRecordInput extends PartialType(CreateRecordInput) {
  // можно переопределить поля, если нужно:
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  data?: string;
}
