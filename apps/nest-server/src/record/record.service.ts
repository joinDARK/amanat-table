import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRecordInput } from './dto/create-record.input';
import { UpdateRecordInput } from './dto/update-record.input';

@Injectable()
export class RecordService {
  constructor(private prisma: PrismaService) {}

  /**
   * Создание новой записи Record
   */
  async create(createRecordInput: CreateRecordInput) {
    const { tableId, data, ...rest } = createRecordInput;

    // Если вы решаете хранить data как Json,
    // но клиент присылает JSON-строку, то парсим:
    const parsedData = data ? JSON.parse(data) : undefined;

    return this.prisma.record.create({
      data: {
        ...rest,
        data: parsedData,
        table: {
          connect: { id: tableId },
        },
      },
      // Если хотите сразу вернуть связанную таблицу, можно:
      // include: { table: true },
    });
  }

  /**
   * Получить все записи
   * Можно добавить пагинацию, фильтрацию и т.п.
   */
  async findAll() {
    return this.prisma.record.findMany({
      // Подтягиваем связанную таблицу, если нужно
      include: {
        table: true,
      },
    });
  }

  /**
   * Получить запись по ID
   */
  async findOne(id: string) {
    const record = await this.prisma.record.findUnique({
      where: { id },
      include: { table: true },
    });
    if (!record) {
      throw new NotFoundException(`Record with id "${id}" not found`);
    }
    return record;
  }

  /**
   * Обновить запись
   */
  async update(id: string, updateRecordInput: UpdateRecordInput) {
    // Можно сначала проверить, что такая запись существует
    // await this.findOne(id);

    let dataForUpdate: any = { ...updateRecordInput };
    if (updateRecordInput.data) {
      dataForUpdate.data = JSON.parse(updateRecordInput.data);
    }

    return this.prisma.record.update({
      where: { id },
      data: dataForUpdate,
      include: {
        table: true,
      },
    });
  }

  /**
   * Удалить запись
   */
  async remove(id: string) {
    return this.prisma.record.delete({
      where: { id },
      // можно добавить { include: { table: true } } если нужно
    });
  }
}
