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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const create_notifications_dto_1 = require("../DTO/create.notifications.dto");
const client_1 = require("@prisma/client");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    async createAndSendNotification(createNotificationDto) {
        const notification = await this.prisma.notification.create({
            data: {
                userId: createNotificationDto.userId,
                message: createNotificationDto.message,
                type: createNotificationDto.type,
            },
        });
        if (createNotificationDto.type === create_notifications_dto_1.NotificationType.EMAIL) {
            try {
                await this.transporter.sendMail({
                    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
                    to: createNotificationDto.email,
                    subject: createNotificationDto.subject,
                    text: createNotificationDto.message,
                    html: createNotificationDto.html,
                });
                await this.prisma.notification.update({
                    where: { id: notification.id },
                    data: { sentAt: new Date() },
                });
                return {
                    success: true,
                    notificationId: notification.id,
                };
            }
            catch (error) {
                return {
                    success: false,
                    notificationId: notification.id,
                    error: error.message,
                };
            }
        }
        return {
            success: true,
            notificationId: notification.id,
        };
    }
    async getByUser(userId) {
        return this.prisma.notification.findMany({
            where: { userId },
            orderBy: { sentAt: 'desc' },
            select: {
                id: true,
                message: true,
                type: true,
                sentAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map