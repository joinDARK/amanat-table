import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(newLogin: string, newPassword: string, roleId?: number) {
    const hashedPassword = await hash(newPassword, 10);

    try {
      const res = await this.prisma.users.create({
        data: {
          login: newLogin,
          password: hashedPassword,
          roleId: roleId ?? 1,
        },
      });
      return {
        "statusCode": 201,
        "message": "Пользователь успешно создан",
      };
    } catch (e) {
      // Обработка кода ошибок Prisma
      switch ((e as any).code) {
        case 'P2002':
          throw new BadRequestException('Логин уже существует');
        case 'P2003':
          throw new NotFoundException('Роль не найдена');
        default:
          throw new InternalServerErrorException(
            'Произошла неизвестная ошибка',
          );
      }
    }
  }

  async readUsers() {
    return await this.prisma.users.findMany();
  }

  async updateUser(id: number, newLogin: string, newPassword: string, roleId: number) {
    const updateData: Prisma.UsersUpdateInput = {
      login: newLogin
    };
  
    if (newPassword !== undefined && newPassword !== '') {
      updateData.password = await hash(newPassword, 10);
    }
  
    if (roleId !== undefined) {
      updateData.role = { connect: { id: roleId } };
    }

    try {
      const res = await this.prisma.users.update({
        where: { id },
        data: updateData,
      });
      return {
        "statusCode": 200,
        "message": "Пользователь успешно обновлен",
      };
    } catch (e) {
      switch ((e as any).code) {
        case 'P2025':
          throw new NotFoundException(`Пользователь с таким id (${id}) не найден`);
        case 'P2002':
          throw new BadRequestException('Логин уже существует');
        case 'P2003':
          throw new NotFoundException('Роль не найдена');
        default:
          throw new InternalServerErrorException(
            e
          );
      }
    }
  }

  async deleteUser(id: number) {
    try {
      const res = await this.prisma.users.delete({
        where: { id },
      });
      return {
        "statusCode": 204,
        "message": "Пользователь успешно удален",
      };
    } catch (e) {
      switch ((e as any).code) {
        case 'P2025':
          throw new NotFoundException(`Пользователь с таким id (${id}) не найден`);
        default:
          throw new InternalServerErrorException(
            'Произошла неизвестная ошибка',
          );
      }
    }
  }
}