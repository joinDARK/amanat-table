import { Controller, UsePipes, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/zod-validation.pipe';
import updateUserSchema from './dto/user-update.dto';
import createUserSchema from './dto/user-create.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() body: { login: string; password: string, roleId?: number }) {
    return this.userService.createUser(body.login, body.password, body.roleId);
  }

  @Get()
  read() {
    return this.userService.readUsers();
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  update(@Body() body: { id: number; login: string; password: string, roleId?: number }) {
    return this.userService.updateUser(body.id, body.login, body.password, body.roleId );
  }

  @Delete()
  delete(@Body() body: { id: number }) {
    return this.userService.deleteUser(body.id);
  }
}