import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSpaceInput } from './dto/create-sapce.input';
import { UpdateSpaceInput } from './dto/update-sapce.input';

@Injectable()
export class SpaceService {
  constructor(private prisma: PrismaService) {}

  async create(createSpaceInput: CreateSpaceInput) {
    return this.prisma.space.create({
      data: createSpaceInput,
    });
  }

  async findAll() {
    return this.prisma.space.findMany({
      include: { baseGroup: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.space.findUnique({
      where: { id },
      include: { baseGroup: true },
    });
  }

  async update(id: string, updateSpaceInput: UpdateSpaceInput) {
    return this.prisma.space.update({
      where: { id },
      data: updateSpaceInput,
    });
  }

  async remove(id: string) {
    return this.prisma.space.delete({
      where: { id },
    });
  }
}