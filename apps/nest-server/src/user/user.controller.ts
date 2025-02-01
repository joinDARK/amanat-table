import { Controller, UsePipes, Get, Post, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/zod-validation.pipe';
import updateUserSchema from './dto/user-update.dto';
import createUserSchema from './dto/user-create.dto';
import { AuthJWTGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from '../role/roles.decorator';

@Controller('users')
@UseGuards(AuthJWTGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin')
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() body: { login: string; password: string, roleId?: number }) {
    return this.userService.createUser(body.login, body.password, body.roleId);
  }

  @Get()
  @Roles('admin')
  read() {
    return this.userService.readUsers();
  }

  @Patch()
  @Roles('admin')
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  update(@Body() body: { id: number; login: string; password: string, roleId?: number }) {
    return this.userService.updateUser(body.id, body.login, body.password, body.roleId );
  }

  @Delete()
  @Roles('admin')
  delete(@Body() body: { id: number }) {
    return this.userService.deleteUser(body.id);
  }
}
