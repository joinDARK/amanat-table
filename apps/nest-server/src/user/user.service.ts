import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { console } from 'inspector';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(newLogin: string, newPassword: string) {
    try {
      const res = await this.prisma.users.create({
        data: {
          login: newLogin,
          password: newPassword,
          roleId: 1,
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

  async updateUser(id: number, newLogin: string, newPassword: string) {
    try {
      const res = await this.prisma.users.update({
        where: { id },
        data: {
          login: newLogin,
          password: newPassword,
        },
      });
      return {
        "statusCode": 200,
        "message": "Пользователь успешно обновлен",
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

  async deleteUser(id: number) {
    try {
      const res = await this.prisma.users.delete({
        where: { id },
      });
      return {
        "statusCode": 200,
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
