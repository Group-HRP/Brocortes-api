import { Expose } from 'class-transformer';

export class AppointmentResponseDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  serviceId: number;

  @Expose()
  date: Date;

  @Expose()
  status: string;

  @Expose()
  user?: { id: number; name: string }; 

  @Expose()
  service?: { id: number; name: string }; 

  constructor(partial: Partial<AppointmentResponseDto>) {
    Object.assign(this, partial);
  }
}
