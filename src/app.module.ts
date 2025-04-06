import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AutenticationModule } from './autentication/autentication.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AutenticationModule,
    PrismaModule,
    UserModule,
    ServiceModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
