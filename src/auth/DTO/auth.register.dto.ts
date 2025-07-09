import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @ApiProperty({example: "Hugo Souza", description: "Nome do user"})
  @IsString()
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres.' })
  name: string;

  @ApiProperty({example: "example@email.com", description: "Email do user"})
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({example: "Senha1234!", description: "Senha do user"})
  @IsString()
  @MinLength(8, { message: 'A senha dever ter no minimo 8 caracteres.' })
  @MaxLength(20, { message: 'A senha dever no máximo 20 caracteres.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    },
  )
  password: string;

  @ApiProperty({example: "client", description: "Tipo de conta do user"})
  @IsString()
  @IsOptional()
  role: 'admin' | 'client';
}
