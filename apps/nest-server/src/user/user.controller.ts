import { Controller, UsePipes, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import z from 'zod';
import { ZodValidationPipe } from 'src/zod-validation.pipe';

const createUserSchema = z.object({
  login: z.string({
    invalid_type_error: 'Логин должен быть строкой',
    required_error: 'Логин обязателен',
  })
  .min(3, 'Имя пользователя должно содержать не менее 3 символов'),
password: z
  .string({
    invalid_type_error: 'Пароль должен быть строкой',
    required_error: 'Пароль обязателен',
  })
  .min(6, 'Пароль должен содержать не менее 6 символов'),
});

const updateUserSchema = z.object({
  id: z.number({
    invalid_type_error: 'ID должен быть числом',
    required_error: 'ID обязателен',
  }),
  login: z
    .string({
      invalid_type_error: 'Логин должен быть строкой',
      required_error: 'Логин обязателен',
    })
    .min(3, 'Имя пользователя должно содержать не менее 3 символов'),
  password: z
    .string({
      invalid_type_error: 'Пароль должен быть строкой',
      required_error: 'Пароль обязателен',
    })
    .min(6, 'Пароль должен содержать не менее 6 символов'),
});

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: { login: string; password: string }) {
    return this.userService.createUser(body.login, body.password);
  }

  @Get()
  async read() {
    return this.userService.readUsers();
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async update(@Body() body: { id: number; login: string; password: string }) {
    return this.userService.updateUser(body.id, body.login, body.password);
  }

  @Delete()
  async delete(@Body() body: { id: number }) {
    return this.userService.deleteUser(body.id);
  }
}
