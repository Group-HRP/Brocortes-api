import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class DeleteAppointmentResponseDto {
  @ApiProperty({ example: true, description: 'Indica sucesso da operação' })
  @Expose()
  success: boolean;

  @ApiProperty({
    example: 'Agendamento cancelado',
    description: 'Mensagem de status',
  })
  @Expose()
  message: string;

  @ApiProperty({ example: 1, description: 'ID do agendamento' })
  @Expose()
  appointmentId: number;

  @ApiProperty({
    example: '2023-12-15T10:30:00Z',
    description: 'Data/hora do cancelamento',
    required: false,
  })
  @Expose()
  canceledAt?: Date;
}
