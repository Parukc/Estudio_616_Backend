// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginDto } from './dto/login-auth.dto'; // ✅ Añadir esta línea
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // 👈 permite acceso público a esta ruta
  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @Public()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
