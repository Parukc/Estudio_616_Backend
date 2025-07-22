import { Controller, Get } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @Roles(UserRole.ADMIN)
  getAdminDashboard() {
    return {
      message: 'Bienvenido al panel de administración',
      status: 'success',
      timestamp: new Date(),
    };
  }
}
