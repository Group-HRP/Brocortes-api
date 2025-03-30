// src/users/dto/delete-user.dto.ts
import { Expose } from 'class-transformer';

export class DeleteUserResponseDto {
  @Expose()
  success: boolean;

  @Expose()
  message: string;

  @Expose()
  deletedUserId?: number;

  constructor(partial: Partial<DeleteUserResponseDto>) {
    Object.assign(this, partial);
  }
}