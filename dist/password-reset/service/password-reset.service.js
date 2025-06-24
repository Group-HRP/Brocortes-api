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
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const reset_password_1 = require("../../sendEmail/reset-password");
const bcrypt = require("bcrypt");
let PasswordResetService = class PasswordResetService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendCodingEmail(sendCodingEmail) {
        const email = sendCodingEmail.email;
        const existEmail = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!existEmail) {
            throw new common_1.NotFoundException("Email inválido ou inesistente.");
        }
        const existingToken = await this.prisma.passwordResetToken.findFirst({
            where: {
                email,
                used: false,
                expiresAt: {
                    gt: new Date(),
                }
            }
        });
        if (existingToken) {
            return {
                message: 'Um código já foi enviado recentemente. Aguarde alguns minutos para solicitar outro.',
            };
        }
        await this.prisma.passwordResetToken.deleteMany({
            where: {
                email,
                OR: [
                    { used: true },
                    { expiresAt: { lt: new Date() } }
                ]
            }
        });
        const generateCode = Math.floor(1000 + Math.random() * 90000).toString();
        const now = new Date();
        const expireAt = new Date(now.getTime() + 10 * 60 * 500);
        await (0, reset_password_1.default)(generateCode, email);
        console.log("[token gerado]", generateCode);
        await this.prisma.passwordResetToken.create({
            data: {
                email: email,
                expiresAt: expireAt,
                token: generateCode,
            }
        });
        return {
            message: 'Se o e-mail estiver correto, enviamos um código de recuperação que expira em 5 minutos.',
        };
    }
    async validateCoding(validateCodingDto) {
        const { token } = validateCodingDto;
        const tokenData = await this.prisma.passwordResetToken.findFirst({
            where: {
                token,
                used: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
            select: {
                id: true,
                email: true,
            },
        });
        if (!tokenData) {
            throw new common_1.BadRequestException('Token inválido ou expirado');
        }
        return {
            message: 'Token validado com sucesso.',
            id: tokenData.id,
            email: tokenData.email,
        };
    }
    async resetPassword(resetPasswordDto) {
        const { email, newPassword } = resetPasswordDto;
        const existUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!existUser) {
            throw new common_1.NotFoundException("Usuário não encontrado");
        }
        const validateToken = await this.prisma.passwordResetToken.findFirst({
            where: {
                email,
                used: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!validateToken) {
            throw new common_1.BadRequestException("Não foi possível recuperar sua senha");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
            }
        });
        await this.prisma.passwordResetToken.update({
            where: { id: validateToken.id },
            data: { used: true },
        });
        return {
            message: 'Senha redefinida com sucesso.',
        };
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], PasswordResetService);
//# sourceMappingURL=password-reset.service.js.map