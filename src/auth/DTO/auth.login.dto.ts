import { IsEmail, IsString } from "class-validator";


export class LoginDTO {
    @IsEmail({}, { message: 'Email inválido.' })
    email: string;

    @IsString({ message: 'Senha inválida.' })
    password: string;
}