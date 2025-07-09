import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: "example@email.com", description: "Email do usuario" })
  @IsEmail({}, { message: 'E-mail inválido.' })
  email: string;

  @ApiProperty({ example: "Senha1234!", description: "Nova senha" })
  @IsNotEmpty({ message: 'A nova senha é obrigatória.' })
  @IsString()
  @MinLength(8, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message: 'A senha deve conter letras e números.',
  })
  newPassword: string;
}
