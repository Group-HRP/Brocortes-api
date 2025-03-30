import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaClient) { }

    async getAllUsers() {
        try {
            const users = await this.prismaService.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return users;
        } catch (error) {
            throw new HttpException(
                error.message = 'Erro ao buscar usuários',
                error.statusCode = HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}

