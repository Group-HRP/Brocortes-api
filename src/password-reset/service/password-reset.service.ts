import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SendCodingEmail } from '../DTO/send-coding-email.dto';
import { PrismaClient } from '@prisma/client';
import ResetPassword from 'src/sendEmail/reset-password';
import { ValidateCoding } from '../DTO/validate-coding.dto';
import { ResetPasswordDto } from '../DTO/reset-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  constructor(private readonly prisma: PrismaClient) {}

  async sendCodingEmail(sendCodingEmail: SendCodingEmail) {
    const email = sendCodingEmail.email;

    const existEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existEmail) {
      throw new NotFoundException('Email inválido ou inexistente.');
    }

    const now = new Date();

    const existingToken = await this.prisma.passwordResetToken.findFirst({
      where: {
        email,
        used: false,
        expiresAt: {
          gt: now,
        },
      },
    });

    if (existingToken) {
      const renewedExpireAt = new Date(now.getTime() + 5 * 60 * 1000);

      await this.prisma.passwordResetToken.update({
        where: {
          id: existingToken.id,
        },
        data: {
          expiresAt: renewedExpireAt,
        },
      });

      await ResetPassword(existingToken.token, email);

      return {
        message:
          'Código reenviado. Você poderá solicitar um novo em 5 minutos.',
      };
    }

    await this.prisma.passwordResetToken.deleteMany({
      where: {
        email,
        OR: [{ used: true }, { expiresAt: { lt: now } }],
      },
    });

    const generateCode = Math.floor(1000 + Math.random() * 90000).toString();
    const expireAt = new Date(now.getTime() + 5 * 60 * 1000);

    await ResetPassword(generateCode, email);

    console.log('[token gerado]', generateCode);

    await this.prisma.passwordResetToken.create({
      data: {
        email: email,
        expiresAt: expireAt,
        token: generateCode,
      },
    });

    return {
      message:
        'Se o e-mail estiver correto, enviamos um código de recuperação que expira em 5 minutos.',
    };
  }

  async validateCoding(validateCodingDto: ValidateCoding) {
    const { token } = validateCodingDto;

    const tokenData = await this.prisma.passwordResetToken.findFirst({
      where: {
        token,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    if (!tokenData) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    return {
      message: 'Token validado com sucesso.',
      id: tokenData.id,
      email: tokenData.email,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, newPassword } = resetPasswordDto;

    const existUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!existUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const validateToken = await this.prisma.passwordResetToken.findFirst({
      where: {
        email,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!validateToken) {
      throw new BadRequestException('Não foi possível recuperar sua senha');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    await this.prisma.passwordResetToken.update({
      where: { id: validateToken.id },
      data: { used: true },
    });

    return {
      message: 'Senha redefinida com sucesso.',
    };
  }
}
