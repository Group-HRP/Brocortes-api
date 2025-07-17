import { Type } from 'class-transformer';
import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  IsPositive,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsPositive()
  duration: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @IsInt({ each: true })
  @Type(() => Number)
  categoryIds: number[];
}
