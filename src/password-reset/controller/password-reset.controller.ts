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
import { ValidateCoding } from '../DTO/validate-coding.dto';
import { ResetPasswordDto } from '../DTO/reset-password.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('send')
  @ApiOperation({summary: "Envia codigo para email do user"})
  async sendCodingEmail(@Body() sendCodingEmail: SendCodingEmail) {
    return this.passwordResetService.sendCodingEmail(sendCodingEmail);
  }

  @Post('validate')
  @ApiOperation({summary: "Valida codigo enviado para o email do user"})
  async validateCoding(@Body() validateCondig: ValidateCoding) {
    return this.passwordResetService.validateCoding(validateCondig);
  }

  @Post('reset')
  @ApiOperation({summary: "Reseta a senha do user"})
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.passwordResetService.resetPassword(resetPasswordDto);
  }
}
