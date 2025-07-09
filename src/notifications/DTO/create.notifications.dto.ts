import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
} from 'class-validator';


export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
