import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

/**
 * Для простоты покажем,
 * что data можно принять как строку
 * (и потом внутри сервиса преобразовать в JSON),
 * либо можно использовать готовый JSON-сериализатор.
 */
@InputType()
export class CreateRecordInput {
  @Field()
  @IsString()
  tableId: string; // указывает, с какой TableMeta связываем запись

  // Поле data как JSON:
  // При желании можно использовать Scalar (см. далее),
  // но для упрощения используем string + парсим в сервисе
  @Field({ nullable: true })
  @IsOptional()
  data?: string;

  @Field()
  @IsString()
  createdBy: string;
}
