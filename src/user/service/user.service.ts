import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDto } from '../DTO/user.update.dto';
import { DeleteUserDto } from '../DTO/user.delete.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaClient) {}

  async getAllUsers() {
    try {
      const users = await this.prismaService.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return users;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar usuários',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar usuário por email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const emailExists = await this.findByEmail(updateUserDto.email);
        if (emailExists) {
          throw new HttpException(
            'Email já está em uso',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao atualizar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: number, deleteUserDto?: DeleteUserDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }

      if (deleteUserDto?.password) {
        const isPasswordValid = await compare(
          deleteUserDto.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
        }
      }

      await this.prismaService.user.delete({
        where: { id },
      });

      return { sucesses: true };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erro ao deletar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
