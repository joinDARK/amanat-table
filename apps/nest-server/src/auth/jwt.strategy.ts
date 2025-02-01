import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret-key',
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.users.findUnique({
      where: { login: payload.login },
      include: {
        role: {
          select: {
            name: true
          }
        }
      }
    });

    if (!user) {
      throw new BadRequestException("Пользователь не найден");
    }

    return {id: user.id, login: user.login, role: user.role.name};
  }
}
