import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceResolver } from './space.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [SpaceResolver, SpaceService, PrismaService],
})
export class SpaceModule {}
