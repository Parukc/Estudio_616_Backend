import { Controller, Get } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
  @Get()
  getProjects() {
    return [
      { id: 1, title: 'Proyecto 1', description: 'Descripción del proyecto 1' },
      { id: 2, title: 'Proyecto 2', description: 'Descripción del proyecto 2' },
    ];
  }
}
