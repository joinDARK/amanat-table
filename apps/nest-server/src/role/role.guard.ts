import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Получаем метаданные 'roles' для текущего обработчика
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(), // Метаданные для метода
      context.getClass(),   // Метаданные для класса
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Если роли не указаны, доступ разрешен
    }

    // Получаем пользователя из запроса
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Пользователь не найден в ответе');
    }

    // Проверяем, есть ли у пользователя хотя бы одна из требуемых ролей
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new UnauthorizedException('Недостаточно прав');
    }

    return true;
  }
}
