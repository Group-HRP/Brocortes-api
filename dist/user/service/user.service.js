"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
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
        }
        catch (error) {
            throw new common_1.HttpException('Erro ao buscar usuários', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByEmail(email) {
        try {
            return await this.prismaService.user.findUnique({
                where: { email },
            });
        }
        catch (error) {
            throw new common_1.HttpException('Erro ao buscar usuário por email', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, updateUserDto) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id: Number(id) },
            });
            if (!user) {
                throw new common_1.HttpException('Usuário não encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            if (updateUserDto.email && updateUserDto.email !== user.email) {
                const emailExists = await this.findByEmail(updateUserDto.email);
                if (emailExists) {
                    throw new common_1.HttpException('Email já está em uso', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            const updatedUser = await this.prismaService.user.update({
                where: { id },
                data: updateUserDto,
            });
            return updatedUser;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao atualizar usuário', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id, deleteUserDto) {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id },
            });
            if (!user) {
                throw new common_1.HttpException('Usuário não encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            if (deleteUserDto?.password) {
                const isPasswordValid = await (0, bcrypt_1.compare)(deleteUserDto.password, user.password);
                if (!isPasswordValid) {
                    throw new common_1.HttpException('Senha incorreta', common_1.HttpStatus.UNAUTHORIZED);
                }
            }
            await this.prismaService.user.delete({
                where: { id },
            });
            return { sucesses: true };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Erro ao deletar usuário', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], UserService);
//# sourceMappingURL=user.service.js.map