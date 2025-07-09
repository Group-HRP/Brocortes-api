import { IsString, IsEmail, IsOptional, IsEnum, Length } from 'class-validator';
import { UserRole } from '../../enums/user.role.enum';
import { IsEmailUnique } from 'src/decorators/is-email-unique.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: "Hugo Souza", description: "Nome do user" })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiProperty({ example: "example@email.com", description: "Email do user" })
  @IsOptional()
  @IsEmail()
  @IsEmailUnique({ message: 'Email já está em uso' })
  email?: string;

  @ApiProperty({ example: "professional", description: "Tipo de conta do user" })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
