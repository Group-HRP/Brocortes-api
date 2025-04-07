import { Module } from '@nestjs/common';
import { BlockedHoursController } from './controller/blocked-hours.controller';
import { BlockedHoursService } from './service/blocked-hours.service';

@Module({
  controllers: [BlockedHoursController],
  providers: [BlockedHoursService],
})
export class BlockedHoursModule {}
