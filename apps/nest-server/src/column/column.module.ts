import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ColumnService } from './column.service';
import { ColumnResolver } from './column.resolver';

@Module({
  providers: [PrismaService, ColumnService, ColumnResolver],
  exports: [ColumnService],
})
export class ColumnModule {}
