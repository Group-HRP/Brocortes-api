import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BlockedHoursResponseDto {
  @ApiProperty({ example: 1, description: 'ID do bloqueio' })
  @Expose()
  id: number;

  @ApiProperty({
    example: '2023-12-25T14:00:00Z',
    description: 'Data e hora bloqueada',
    type: String,
    format: 'date-time',
  })
  @Expose()
  date: Date;

  @ApiProperty({
    example: 'Feriado de Natal',
    description: 'Motivo do bloqueio',
  })
  @Expose()
  reason: string;

  @ApiProperty({
    example: '2023-12-20T09:00:00Z',
    description: 'Data de criação do registro',
    type: String,
    format: 'date-time',
  })
  @Expose()
  createdAt: Date;

  constructor(partial: Partial<BlockedHoursResponseDto>) {
    Object.assign(this, partial);
  }
}
