import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDTO } from '../DTO/auth.register.dto';
import { LoginDTO } from '../DTO/auth.login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: "Regista um novo user" })
  async registerUser(@Body() registerDTO: RegisterDTO) {
    try {
      const user = await this.authService.registerUser(registerDTO);

      return {
        StatusCode: HttpStatus.CREATED,
        message: 'Usuário criado com sucesso',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao criar usuário',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @ApiOperation({ summary: "Login do user" })
  async loginUser(@Body() loginDTO: LoginDTO) {
    try {
      const user = await this.authService.validateUser(
        loginDTO.email,
        loginDTO.password,
      );
      return this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
  }
}
