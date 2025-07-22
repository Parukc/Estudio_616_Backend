import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GalleryService } from './gallery.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // 👈 Solo usuarios con rol "admin" pueden subir imágenes
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/gallery',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('projectId') projectId: string,
  ) {
    const imageUrl = `http://localhost:3000/uploads/gallery/${file.filename}`;
    return this.galleryService.create({
      url: imageUrl,
      projectId: projectId ? parseInt(projectId, 10) : undefined,
    });
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.galleryService.findByProject(Number(projectId));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // 👈 Solo admins pueden eliminar imágenes
  delete(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }
}
