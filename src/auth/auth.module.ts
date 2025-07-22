import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';  // Asegúrate de importar UsersModule
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Asegúrate de que User esté disponible aquí
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secreto616',
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,  // Asegúrate de que UsersModule esté importado
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
