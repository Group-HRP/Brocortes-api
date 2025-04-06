import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AppointmentResponseDto {
  @ApiProperty({ example: 1, description: 'ID do agendamento' })
  @Expose()
  id: number;

  @ApiProperty({ example: 1, description: 'ID do usuário' })
  @Expose()
  userId: number;

  @ApiProperty({ example: 1, description: 'ID do serviço' })
  @Expose()
  serviceId: number;

  @ApiProperty({ example: '2023-12-15T14:30:00Z', description: 'Data do agendamento' })
  @Expose()
  date: Date;

  @ApiProperty({ 
    example: 'scheduled', 
    description: 'Status do agendamento',
    enum: ['scheduled', 'completed', 'canceled']
  })
  @Expose()
  status: string;

  @ApiProperty({ example: '2023-12-01T10:00:00Z', description: 'Data de criação' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: '2023-12-01T10:05:00Z', description: 'Data de atualização' })
  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<AppointmentResponseDto>) {
    Object.assign(this, partial);
  }
}