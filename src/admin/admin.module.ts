import { Module } from '@nestjs/common';
import { AdminController } from './admincontroller';
import { AdminService } from './admin.service';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { GalleryModule } from '../gallery/gallery.module';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [UsersModule, ProjectsModule, GalleryModule, ContactsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
