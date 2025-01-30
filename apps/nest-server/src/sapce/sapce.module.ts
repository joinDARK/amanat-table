import { Module } from '@nestjs/common';
import { SpaceService } from './sapce.service';
import { SpaceResolver } from './sapce.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [SpaceResolver, SpaceService, PrismaService],
})
export class SpaceModule {}