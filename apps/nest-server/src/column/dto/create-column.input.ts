import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateColumnInput {
  @Field()
  @IsString()
  tableId: string; // Связь с TableMeta

  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  options?: string;

  @Field()
  @IsString()
  type: string;

  @Field()
  @IsString()
  cellValueType: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isMultipleCellValue?: boolean;

  @Field()
  @IsString()
  dbFieldType: string;

  @Field()
  @IsString()
  dbFieldName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  notNull?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  unique?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isComputed?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isLookup?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPending?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasError?: boolean;

  // Если нужно создать lookup-связь при создании
  // можно добавить lookupLinkedFieldId?: string
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lookupLinkedFieldId?: string;

  @Field(() => Float)
  order: number;

  @Field()
  @IsString()
  createdBy: string;
}
