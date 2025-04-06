import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsAdmin } from '../../decorators/is-admin.decorator';

export class ListUsersDto {
  @IsNotEmpty()
  @IsString()
  @Validate(IsAdmin, {
    message: 'Apenas administradores podem listar usuários',
  })
  role: string;
}
