import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @Length(5, 50)
    @IsNotEmpty()
    name: string;
}
