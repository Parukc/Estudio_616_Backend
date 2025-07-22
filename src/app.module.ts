import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';

// 🔐 Seguridad
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guards';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';

// 📦 Módulos del sistema
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ContactsModule } from './contacts/contacts.module';
import { ServicesModule } from './services/services.module';
import { GalleryModule } from './gallery/gallery.module';
import { OrdersModule } from './orders/orders.module';
import { AdminModule } from './admin/admin.module';
import { InfoRequestModule } from './info-request/info-request.module'; // ✅ NUEVO

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),

    MongooseModule.forRoot(process.env.MONGO_URI!), // ✅ Mongo Atlas

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secreto616',
      signOptions: { expiresIn: '1d' },
    }),

    // Módulos internos
    AuthModule,
    UsersModule,
    ProjectsModule,
    ContactsModule,
    ServicesModule,
    GalleryModule,
    OrdersModule,
    AdminModule,
    InfoRequestModule, // ✅ Agregado aquí
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
