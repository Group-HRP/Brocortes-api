import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterDTO } from '../DTO/auth.register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaClient,
        private jwtService: JwtService,
    ) {}

    async registerUser(user: RegisterDTO) {
        try {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(user.password, saltRounds);

            const existingUser = await this.prisma.user.findUnique({
                where: { email: user.email },
            });

            if (existingUser) {
                throw new HttpException('Email já cadastrado no sistema', HttpStatus.CONFLICT);
            }

            const newUser = await this.prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: hashPassword,
                },
            });

            return { user: newUser };
        } catch (error) {
            throw new HttpException(
                error.message || 'Erro ao registrar usuário',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException('Email ou senha incorreta');
        }

        return { id: user.id, email: user.email, role: user.role };
    }

    async login(user: { id: number; email: string; role: string }) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}