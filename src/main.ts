import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ CORS CONFIG → Solo permite solicitudes desde tu frontend en Netlify
  app.enableCors({
    origin: ['https://estudio616.netlify.app'], // Puedes agregar más dominios si necesitas
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Para permitir envío de cookies o headers JWT
  });

  // 📁 SERVIR ARCHIVOS ESTÁTICOS (solo en local o servidores que soporten FS)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // ✅ Validaciones globales para los DTOs
  app.useGlobalPipes(new ValidationPipe());

  // 📘 Swagger config
  const config = new DocumentBuilder()
    .setTitle('Estudio 616 API')
    .setDescription('Documentación de la API del estudio de arquitectura')
    .setVersion('1.0')
    .addBearerAuth() // Para endpoints protegidos por JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 🚀 Iniciar la app
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
