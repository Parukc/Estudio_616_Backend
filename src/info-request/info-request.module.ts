import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoRequest, InfoRequestSchema } from './schemas/info-request.schema';
import { InfoRequestService } from './info-request.service';
import { InfoRequestController } from './info-request.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InfoRequest.name, schema: InfoRequestSchema },
    ]),
  ],
  providers: [InfoRequestService],
  controllers: [InfoRequestController],
})
export class InfoRequestModule {}
