import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [AuthModule, RoleModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
