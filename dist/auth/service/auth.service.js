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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerUser(user) {
        try {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(user.password, saltRounds);
            const existingUser = await this.prisma.user.findUnique({
                where: { email: user.email },
            });
            if (existingUser) {
                throw new common_1.HttpException('Email já cadastrado no sistema', common_1.HttpStatus.CONFLICT);
            }
            const newUser = await this.prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: hashPassword,
                    role: user.role || 'client',
                },
            });
            return { user: newUser };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Erro ao registrar usuário', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email ou senha inválidos');
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Email ou senha incorreta');
        }
        return { id: user.id, email: user.email, role: user.role };
    }
    async login(user) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map