import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<UpdateUserResponseDto>) {
    Object.assign(this, partial);
  }
}
