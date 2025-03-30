import { IsString, IsEmail, IsOptional, IsEnum, Length } from 'class-validator';
import { UserRole } from '../enums/user.role.enum'; 
import { IsEmailUnique } from 'src/decorators/is-email-unique.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsEmailUnique({ message: 'Email já está em uso' })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(6, 100)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}