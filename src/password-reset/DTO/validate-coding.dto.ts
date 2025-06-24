import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class ValidateCoding {
    @IsNotEmpty()
    @IsString()
    @Length(4, 4, { message: 'O código deve ter exatamente 4 caracteres.' })
    @Matches(/^\d{4}$/, { message: 'O código deve conter apenas números.' })
    token: string;
}