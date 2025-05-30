import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AutenticationModule } from './autentication/autentication.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { BlockedHoursModule } from './blockedHours/blocked-hours.module';
import { NotificationsController } from './notifications/controller/notifications.controller';
import { NotificationsService } from './notifications/service/notifications.service';
import { CategoryModule } from './category/category.module';
import { WorkingHoursModule } from './workingHours/working-hours.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AutenticationModule,
    PrismaModule,
    UserModule,
    ServiceModule,
    AppointmentsModule,
    BlockedHoursModule,
    CategoryModule,
    WorkingHoursModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class AppModule {}
