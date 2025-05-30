import { Module } from '@nestjs/common';
import { WorkingHoursService } from './service/working-hours.service';
import { WorkingHoursController } from './controller/working-hours.controller';

@Module({
  controllers: [WorkingHoursController],
  providers: [WorkingHoursService],
})
export class WorkingHoursModule {}
