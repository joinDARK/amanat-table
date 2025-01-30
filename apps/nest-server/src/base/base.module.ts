import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseResolver } from './base.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [BaseResolver, BaseService, PrismaService],
})
export class BaseModule {}