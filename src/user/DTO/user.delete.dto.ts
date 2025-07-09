import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ConfirmDeletion } from 'src/decorators/confirm-deletion.decorator';

export class DeleteUserDto {
  @ApiProperty({ example: "DELETE", description: "Palavra chave para deletar conta" })
  @ConfirmDeletion({ message: 'Confirme com "DELETE" para prosseguir' })
  confirmation: string;

  @ApiProperty({ example: "Senha1234@", description: "Senha do user para confirmar", required: false })
  @IsOptional()
  @IsString()
  password?: string;
}
