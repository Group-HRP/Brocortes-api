import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class DeleteAppointmentDto {
  @ApiProperty({
    example: true,
    description: 'Confirmação explícita para deletar',
    required: true,
  })
  @IsBoolean()
  confirm: boolean;

  @ApiProperty({
    example: 'Cliente cancelou',
    description: 'Motivo do cancelamento (opcional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  cancellationReason?: string;
}
