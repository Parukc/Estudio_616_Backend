import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getDashboardData() {
    return {
      totalProjects: 12,
      totalImages: 47,
      totalContacts: 5,
    };
  }
}
