import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';

export enum NotificationType {
  EMAIL = 'email',
  SYSTEM = 'system',
  PUSH = 'push',
}

export class CreateNotificationDto {
  @ApiProperty({ example: 1, description: 'ID do usuário destinatário' })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 'usuario@email.com',
    description: 'E-mail do destinatário',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Notificação importante', description: 'Assunto' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    example: 'Conteúdo da mensagem...',
    description: 'Corpo da notificação',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    enum: NotificationType,
    example: 'email',
    description: 'Tipo de notificação',
  })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({
    example: '<h1>Conteúdo HTML</h1>',
    description: 'Versão HTML (opcional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  html?: string;
}
