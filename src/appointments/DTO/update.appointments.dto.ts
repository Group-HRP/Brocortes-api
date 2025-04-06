import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointments.status.enum';

export class UpdateAppointmentDto {
  @ApiProperty({
    example: 1,
    description: 'ID do serviço (apenas admin)',
    required: false,
  })
  @IsInt()
  @IsOptional()
  serviceId?: number;

  @ApiProperty({
    example: '2023-12-15T15:00:00Z',
    description: 'Nova data (apenas admin)',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({
    example: 'completed',
    description: 'Novo status',
    enum: AppointmentStatus,
    required: false,
  })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;
}
