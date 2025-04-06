import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1, description: 'ID do usuário' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, description: 'ID do serviço' })
  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  @ApiProperty({
    example: '2023-12-15T14:30:00Z',
    description: 'Data e hora do agendamento (ISO 8601)',
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: 'scheduled',
    description: 'Status do agendamento',
    required: false,
    default: 'scheduled',
  })
  @IsString()
  @IsOptional()
  status?: string;
}
