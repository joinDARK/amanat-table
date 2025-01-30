import { Injectable, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(newRole: string) {
    try {
      const res = await this.prisma.roles.create({
        data: {
          name: newRole
        }
      });
      return {
        "statusCode": 201,
        "message": "Роль успешно создана",
      };
    } catch(e) {
      switch ((e as any).code) {
        case 'P2002':
          throw new BadRequestException('Роль уже существует');
        default:
          throw new InternalServerErrorException(
            'Произошла неизвестная ошибка',
          );
      }
    }
  }

  async readRoles() {
    return await this.prisma.roles.findMany();
  }

  async updateRole(id: number, roleName: string) {
    try {
      const res = await this.prisma.roles.update({
        where: { id },
        data: {
          name: roleName
        }
      });
      return {
        "statusCode": 200,
        "message": "Роль успешно обновлена",
      };
    } catch(e) {
      switch ((e as any).code) {
        case 'P2025':
          throw new NotFoundException(`Роль с таким id (${id}) не найден`);
        case 'P2002':
          throw new BadRequestException('Роль уже существует');
        default:
          throw new InternalServerErrorException(
            'Произошла неизвестная ошибка',
          );
      }
    }
  }

  async deleteRole(id: number) {
    try {
      const res = await this.prisma.roles.delete({
        where: { id }
      });
      return {
        "statusCode": 204,
        "message": "Роль успешно удалена",
      };
    } catch(e) {
      switch ((e as any).code) {
        case 'P2025':
          throw new NotFoundException(`Роль с таким id (${id}) не найден`);
        default:
          throw new InternalServerErrorException(
            'Произошла неизвестная ошибка',
          );
      }
    }
  }
}
