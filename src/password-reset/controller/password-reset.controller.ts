import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PasswordResetService } from '../service/password-reset.service';
import { SendCodingEmail } from '../DTO/send-coding-email.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { ValidateCoding } from '../DTO/validate-coding.dto';
import { ResetPasswordDto } from '../DTO/reset-password.dto';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('send')
  async sendCodingEmail(@Body() sendCodingEmail: SendCodingEmail) {
    return this.passwordResetService.sendCodingEmail(sendCodingEmail);
  }

  @Post('validate')
  async validateCoding(@Body() validateCondig: ValidateCoding) {
    return this.passwordResetService.validateCoding(validateCondig);
  }

  @Post('reset')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordResetService.resetPassword(resetPasswordDto);
  }
}
