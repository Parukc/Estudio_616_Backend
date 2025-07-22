import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Permitir peticiones desde tu frontend (Netlify u otros)
  app.enableCors({
    origin: ['https://estudio616.netlify.app'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
  });

  // ✅ Servir archivos estáticos desde /uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // ✅ Habilita validaciones DTO globales
  app.useGlobalPipes(new ValidationPipe());

  // ✅ Swagger (documentación de tu API)
  const config = new DocumentBuilder()
    .setTitle('Estudio 616 API')
    .setDescription('Documentación de la API del estudio de arquitectura')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // ✅ Levanta el servidor
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
