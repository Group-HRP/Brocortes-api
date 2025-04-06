import { Decimal } from '@prisma/client/runtime/library';
import { Expose, Transform } from 'class-transformer';

export class ServiceResponseDto {
  @Expose()
  id: number;
  
  @Expose()
  name: string;
  
  @Expose()
  description: string | null;
  
  @Expose()
  @Transform(({ value }) => value?.toNumber?.() || value)
  price: number;
  
  @Expose()
  duration: number;
  
  @Expose()
  createdAt: Date;
  
  @Expose()
  updatedAt: Date;
  
  @Expose()
  company?: { id: number, name: string };

  constructor(partial: Partial<ServiceResponseDto>) {
    Object.assign(this, partial);
  }
}