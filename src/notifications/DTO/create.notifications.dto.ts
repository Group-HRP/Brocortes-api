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
  @ApiProperty({ example: "Token expo", description: "Token do expo"})
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 12, description: "Id do user"})
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
