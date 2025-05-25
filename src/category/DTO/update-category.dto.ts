import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsInt, IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    @Length(5, 50)
    name?: string;

    @IsNumber()
    @IsPositive()
    @IsInt()
    serviceId?: number;
}
