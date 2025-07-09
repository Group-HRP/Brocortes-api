import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class ValidateCoding {
  @ApiProperty({ example: "12345", description: "Codigo de 5 digitos enviado para o email do user" })
  @IsNotEmpty()
  @IsString()
  @Length(4, 4, { message: 'O código deve ter exatamente 4 caracteres.' })
  @Matches(/^\d{4}$/, { message: 'O código deve conter apenas números.' })
  token: string;
}
