import { Module } from '@nestjs/common';
import { PasswordResetService } from './service/password-reset.service';
import { PasswordResetController } from './controller/password-reset.controller';

@Module({
  controllers: [PasswordResetController],
  providers: [PasswordResetService],
})
export class PasswordResetModule {}
