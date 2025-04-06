import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @ApiProperty({ example: 1, description: 'Novo ID do serviço (opcional)' })
  @IsInt()
  @IsOptional()
  serviceId?: number;

  @ApiProperty({ 
    example: '2023-12-15T15:00:00Z', 
    description: 'Nova data (opcional)',
    required: false
  })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({ 
    example: 'completed', 
    description: 'Novo status',
    enum: ['scheduled', 'completed', 'canceled'],
    required: false
  })
  @IsString()
  @IsOptional()
  status?: string;
}