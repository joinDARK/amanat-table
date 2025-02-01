import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTableMetaInput } from './dto/create-table-meta.input';
import { UpdateTableMetaInput } from './dto/update-table-meta.input';

@Injectable()
export class TableMetaService {
  constructor(private prisma: PrismaService) {}

  // Создать новую запись
  async create(createTableMetaInput: CreateTableMetaInput) {
    return this.prisma.tableMeta.create({
      data: {
        name: createTableMetaInput.name,
        description: createTableMetaInput.description,
        dbTableName: createTableMetaInput.dbTableName,
        order: createTableMetaInput.order,
        base: {
          connect: { id: createTableMetaInput.baseId },
        },
        createdBy: createTableMetaInput.createdBy,
      },
    });
  }

  // Получить все записи
  async findAll() {
    return this.prisma.tableMeta.findMany({
      include: {
        base: {
          include: { space: true },  // чтобы сразу подтянуть Space
        },
        fields: true,  // если нужно подтянуть Field (columns)
        records: true, // если нужно подтянуть записи
      },
    });
  }

  // Найти по ID
  async findOne(id: string) {
    return this.prisma.tableMeta.findUnique({
      where: { id },
      include: {
        base: {
          include: { space: true },  // чтобы сразу подтянуть Space
        },
        fields: true,
        records: true,
      },
    });
  }

  // Обновить
  async update(id: string, updateTableMetaInput: UpdateTableMetaInput) {
    return this.prisma.tableMeta.update({
      where: { id },
      data: updateTableMetaInput,
    });
  }

  // Удалить
  async remove(id: string) {
    return this.prisma.tableMeta.delete({
      where: { id },
    });
  }
}
