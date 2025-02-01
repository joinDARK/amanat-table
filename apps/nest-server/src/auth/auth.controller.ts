import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import authSchema from './dto/auth.dto';
import { ZodValidationPipe } from 'src/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reg')
  @UsePipes(new ZodValidationPipe(authSchema))
  async reg(@Body() body: { login: string, password: string }) {
    return await this.authService.reg(body);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(authSchema))
  async login(@Body() body: { login: string, password: string }) {
    return await this.authService.auth(body);
  }
}
