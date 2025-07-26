import { Module } from '@nestjs/common';
import { ServiceController } from './controller/service.controller';
import { ServiceService } from './service/service.service';
import { AutenticationModule } from '../autentication/autentication.module';

@Module({
  imports: [AutenticationModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
