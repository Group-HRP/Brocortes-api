import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDTO } from '../DTO/auth.register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authSerivce: AuthService) { }

    @Post('register')
    async registerUser(@Body() registerDTO: RegisterDTO) {
        try {
            const user = await this.authSerivce.registerUser(registerDTO)

            return {
                StatusCode: HttpStatus.CREATED,
                message: 'Usuário criado com sucesso',
                data: user
            }
        } catch(error) {
            throw new HttpException (
                error.message || 'Erro ao criar usuário',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

}
