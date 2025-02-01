import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';

@Module({
  providers: [PrismaService, RecordService, RecordResolver],
  exports: [RecordService],
})
export class RecordModule {}
