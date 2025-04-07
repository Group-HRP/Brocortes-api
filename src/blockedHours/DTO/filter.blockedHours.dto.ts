import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class BlockedHoursFilterDto {
  @ApiProperty({
    example: '2023-12-01',
    description: 'Filtrar a partir desta data',
    required: false,
    type: String,
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Filtrar até esta data',
    required: false,
    type: String,
    format: 'date',
  })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    example: 'Feriado',
    description: 'Filtrar por motivo (contém o texto)',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;
}
