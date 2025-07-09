import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { ArrayNotEmpty, IsArray, IsInt, IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ example: "Destaques", description: "Nome da categoria", required: false })
  @IsString()
  @Length(5, 50)
  name?: string;

  @ApiProperty({ example: [1, 5, 6], description: "Ids do services" })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  serviceIds?: number[];
}