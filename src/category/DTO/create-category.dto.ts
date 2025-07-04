import { IsArray, IsInt, IsNotEmpty, IsString, Length, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  @Length(5, 50)
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  serviceIds: number[];
}
