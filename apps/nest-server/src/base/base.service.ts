import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBaseInput } from './dto/create-base.input';
import { UpdateBaseInput } from './dto/update-base.input';

@Injectable()
export class BaseService {
  constructor(private prisma: PrismaService) {}

  async create(createBaseInput: CreateBaseInput) {
    return this.prisma.base.create({
      data: {
        name: createBaseInput.name,
        createdBy: createBaseInput.createdBy,
        order: createBaseInput.order,
        space: {
          connect: { id: createBaseInput.spaceId },
        },
      },
      include: { space: true, tables: true },
    });
  }

  async findAll() {
    return this.prisma.base.findMany({
      include: { space: true, tables: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.base.findUnique({
      where: { id },
      include: { space: true, tables: true },
    });
  }

  async update(id: string, updateBaseInput: UpdateBaseInput) {
    return this.prisma.base.update({
      where: { id },
      data: updateBaseInput,
      include: { space: true, tables: true },
    });
  }

  async remove(id: string) {
    return this.prisma.base.delete({
      where: { id },
    });
  }
}