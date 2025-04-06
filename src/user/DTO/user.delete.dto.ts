import { IsOptional, IsString } from 'class-validator';
import { ConfirmDeletion } from 'src/decorators/confirm-deletion.decorator';

export class DeleteUserDto {
  @ConfirmDeletion({ message: 'Confirme com "DELETE" para prosseguir' })
  confirmation: string;

  @IsOptional()
  @IsString()
  password?: string;
}
