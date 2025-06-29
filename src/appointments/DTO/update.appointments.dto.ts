import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '../../enums/appointments.status.enum';

export class UpdateAppointmentDto {
  @ApiProperty({
    example: 1,
    description: 'ID do serviço (apenas admin)',
    required: false,
  })
  @IsOptional()
  @IsInt()
  serviceId?: number;

  @ApiProperty({
    example: '2023-12-15T15:00:00Z',
    description: 'Nova data do agendamento (apenas admin)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({
    example: 'completed',
    description: 'Status do agendamento',
    enum: AppointmentStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;

  @ApiProperty({
    example: '2025-06-28T14:00:00Z',
    description: 'Data de cancelamento',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  canceledAt?: Date;

  @ApiProperty({
    example: 1,
    description: 'ID do usuário que cancelou',
    required: false,
  })
  @IsOptional()
  @IsInt()
  canceledById?: number;

  @ApiProperty({
    example: 'Cliente não compareceu',
    description: 'Motivo do cancelamento',
    required: false,
  })
  @IsOptional()
  @IsString()
  cancellationReason?: string;
}
