import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  // ✅ Crear imagen por URL
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Solo administradores pueden subir imágenes
  async uploadImageFromUrl(
    @Body('url') url: string,
    @Body('projectId') projectId?: number,
  ) {
    return this.galleryService.create({
      url,
      projectId,
    });
  }

  // ✅ Obtener todas las imágenes
  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  // ✅ Obtener imágenes por ID de proyecto
  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.galleryService.findByProject(Number(projectId));
  }

  // ✅ Eliminar imagen por ID
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.galleryService.delete(id);
  }
}
