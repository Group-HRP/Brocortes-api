import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendCodingEmail {
  @ApiProperty({ example: "example@email.com", description: "Email do user" })
  @IsString()
  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty()
  email: string;
}
