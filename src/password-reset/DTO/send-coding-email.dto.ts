import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendCodingEmail {
    @IsString()
    @IsEmail({}, { message: 'E-mail inválido.' })
    @IsNotEmpty()
    email: string;
}
