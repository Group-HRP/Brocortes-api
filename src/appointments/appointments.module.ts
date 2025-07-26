import { Module } from '@nestjs/common';
import { AppointmentsController } from './controller/appointments.controller';
import { AppointmentsService } from './service/appointments.service';
import { NotificationsService } from '../notifications/service/notifications.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, NotificationsService],
})
export class AppointmentsModule {}
