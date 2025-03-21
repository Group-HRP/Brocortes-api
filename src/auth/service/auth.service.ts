import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDTO } from '../DTO/auth.register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private prisma = new PrismaClient();

    async registerUser(user: RegisterDTO) {
        try {
            const saltaRouds = 10;
            const hashPassword = await bcrypt.hash(user.password, saltaRouds);

            const existingUser = await this.prisma.user.findUnique({
                where: { email: user.email }
            })

            if (existingUser) {
                throw new HttpException('Email já cadastrado no sistema', HttpStatus.CONFLICT)
            }

            const newUser = await this.prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: hashPassword
                }
            })

            return { user: newUser }
        } catch (error) {
            throw new HttpException(
                error.message || 'Erro ao registrar usuário',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
