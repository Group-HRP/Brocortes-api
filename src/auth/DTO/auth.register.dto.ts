import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsString()
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres.' })
  name: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

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

  @IsString()
  @IsOptional()
  role: 'admin' | 'client';
}
