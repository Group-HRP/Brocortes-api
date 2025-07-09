import { IsArray, IsInt, IsNotEmpty, IsString, Length, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: "Destaques", description: "Nome da categoria" })
  @IsString()
  @Length(5, 50)
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: [1, 2, 5], description: "Array de Ids de servicos" })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  serviceIds: number[];
}
