import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBlockedHoursDto {
  @ApiProperty({
    example: '2023-12-31T14:00:00Z',
    description: 'Nova data e hora (opcional)',
    required: false,
    type: String,
    format: 'date-time'
  })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({
    example: 'Recesso de fim de ano',
    description: 'Novo motivo (opcional)',
    required: false,
    maxLength: 255
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  reason?: string;
}