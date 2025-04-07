import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBlockedHoursDto {
  @ApiProperty({
    example: '2023-12-25T14:00:00Z',
    description: 'Data e hora do bloqueio (formato ISO 8601)',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: 'Feriado de Natal',
    description: 'Motivo do bloqueio',
    minLength: 3,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  reason: string;
}
