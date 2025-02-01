import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async auth(user: {login: string, password: string}) {
    try {
      const res = await this.prisma.users.findUnique({
        where: {
          login: user.login
        },
        include: {
          role: {
            select: {
              name: true
            }
          }
        }
      })

      if(!res || !compare(user.password, res.password)) {
        throw new BadRequestException("Неверный логин или пароль")
      } else {
        const payload = { login: res.login, role: res.role.name };
        const token = this.jwtService.sign(payload);
        return ({
          "statusCode": 200,
          "message": `Пользователь ${res.login } авторизован`,
          "jwt": token
        })
      }
    } catch(e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException(e)
    }
  }

  async reg(newUser: {login: string, password: string}) {
    newUser.password = await hash(newUser.password, 10);

    try {
      const res = await this.prisma.users.create({
        data: newUser
      })
      return {
        "statusCode": 201,
        "message": "Пользователь успешно создан",
      }
    } catch(e) {
      switch ((e as Prisma.PrismaClientKnownRequestError).code) {
        case 'P2002':
          throw new BadRequestException('Логин уже существует');
        case 'P2003':
          throw new NotFoundException('Роль не найдена');
        default:
          throw new InternalServerErrorException(
            `Произошла неизвестная ошибка (${(e as any).code ?? e})`,
          );
      }
    }
  }
}
