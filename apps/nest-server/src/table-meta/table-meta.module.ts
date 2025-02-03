import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TableMetaService } from './table-meta.service';
import { TableMetaResolver } from './table-meta.resolver';

@Module({
  providers: [PrismaService, TableMetaService, TableMetaResolver],
  exports: [TableMetaService],
})
export class TableMetaModule {}
