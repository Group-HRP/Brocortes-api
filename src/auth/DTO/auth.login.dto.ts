import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({example: "exampla@email.com", description: "Email do user"})
  @IsEmail({}, { message: 'Email inválido.' })
  email: string;

  @ApiProperty({example: "Senha1234@", description: "Senha do user"})
  @IsString({ message: 'Senha inválida.' })
  password: string;
}
