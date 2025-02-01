import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';

@Injectable()
export class ColumnService {
  constructor(private prisma: PrismaService) {}

  async create(createColumnInput: CreateColumnInput) {
    const {
      tableId,
      lookupLinkedFieldId,
      ...rest
    } = createColumnInput;

    return this.prisma.column.create({
      data: {
        ...rest,
        table: {
          connect: { id: tableId },
        },
        // Если используете self-relation для lookup
        ...(lookupLinkedFieldId
          ? {
              lookupLinkedField: {
                connect: { id: lookupLinkedFieldId },
              },
            }
          : {}),
      },
    });
  }

  async findAll() {
    return this.prisma.column.findMany({
      include: {
        // Если нужно тянуть связанную TableMeta:
        table: true,
        // Если используете self-relation для lookup:
        lookupLinkedField: true,
      },
    });
  }

  async findOne(id: string) {
    const column = await this.prisma.column.findUnique({
      where: { id },
      include: {
        table: true,
        lookupLinkedField: true,
      },
    });
    if (!column) {
      throw new NotFoundException(`Column with id=${id} not found`);
    }
    return column;
  }

  async update(id: string, updateColumnInput: UpdateColumnInput) {
    // Можно проверить, существует ли запись
    // await this.findOne(id);

    return this.prisma.column.update({
      where: { id },
      data: updateColumnInput,
    });
  }

  async remove(id: string) {
    return this.prisma.column.delete({
      where: { id },
    });
  }
}
