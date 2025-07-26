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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const notifications_service_1 = require("../..//notifications/service/notifications.service");
let AppointmentsService = class AppointmentsService {
    prisma;
    notificationsService;
    constructor(prisma, notificationsService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
    }
    async createAppointment(createAppointmentsDto) {
        try {
            const appointments = await this.prisma.appointment.create({
                data: {
                    date: createAppointmentsDto.date,
                    status: createAppointmentsDto.status,
                    userId: createAppointmentsDto.userId,
                    serviceId: createAppointmentsDto.serviceId,
                },
            });
            const usersToNotify = await this.prisma.user.findMany({
                where: {
                    role: { in: ['professional', 'admin'] },
                    PushToken: {
                        some: {},
                    },
                },
                include: {
                    PushToken: true,
                },
            });
            for (const user of usersToNotify) {
                for (const pushToken of user.PushToken) {
                    await this.notificationsService.sendPushNotification(pushToken.token, 'Novo agendamento criado', `Um cliente acabou de agendar um horário.`);
                    await this.prisma.notification.create({
                        data: {
                            userId: user.id,
                            message: 'Um novo agendamento foi criado por um cliente.',
                            type: 'appointment',
                        },
                    });
                }
            }
            return appointments;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Erro ao criar agendamento', error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllAppointments(req) {
        const user = req.user.id;
        const userRole = req.user.role;
        let appointments;
        if (userRole === 'admin') {
            appointments = await this.prisma.appointment.findMany({
                where: {
                    status: 'scheduled',
                },
                include: {
                    service: {
                        select: { id: true, name: true, duration: true, price: true },
                    },
                    user: {
                        select: { id: true, name: true },
                    },
                },
                orderBy: {
                    date: 'asc',
                },
            });
            if (!appointments || appointments.length === 0) {
                throw new common_1.NotFoundException('Nenhum agendamento encontrado');
            }
            return appointments;
        }
        appointments = await this.prisma.appointment.findMany({
            where: {
                userId: user,
                status: 'scheduled',
            },
            include: {
                service: {
                    select: { id: true, name: true, duration: true, price: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!appointments || appointments.length === 0) {
            throw new common_1.NotFoundException('Nenhum agendamento encontrado');
        }
        return appointments;
    }
    async getAppointmentUnique(appointmentId) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        duration: true,
                        price: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!appointment)
            throw new common_1.NotFoundException('Serviço não encontrado' + appointmentId);
        return appointment;
    }
    async getHistoricAppointments(id, req) {
        const userId = req.user.id;
        const userRole = req.user.role;
        let appointments;
        if (userRole === 'client') {
            appointments = await this.prisma.appointment.findMany({
                where: {
                    userId: userId,
                    id: id,
                    status: {
                        in: ['completed', 'canceled'],
                    },
                },
                include: {
                    service: {
                        select: {
                            id: true,
                            name: true,
                            duration: true,
                            price: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!appointments || appointments.length === 0) {
                throw new common_1.NotFoundException('Nenhum agendamento encontrado');
            }
            return appointments;
        }
        appointments = await this.prisma.appointment.findMany({
            where: {
                id: id,
                status: {
                    in: ['completed', 'canceled'],
                },
            },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        duration: true,
                        price: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!appointments || appointments.length === 0) {
            throw new common_1.NotFoundException('Nenhum agendamento encontrado');
        }
        return appointments;
    }
    async getAllHistoricAppointments(req) {
        const userId = req.user?.id;
        const userRole = req.user?.role;
        if (userRole === "client") {
            const historicAppointment = await this.prisma.appointment.findMany({
                where: { userId: userId, status: { in: ['completed', 'canceled'] }, },
                include: {
                    service: {
                        select: {
                            id: true,
                            name: true,
                            duration: true,
                            price: true,
                        },
                    },
                },
                orderBy: {
                    updatedAt: 'desc',
                }
            });
            return historicAppointment;
        }
        const appointments = await this.prisma.appointment.findMany({
            where: {
                status: {
                    in: ['completed', 'canceled'],
                },
            },
            include: {
                service: {
                    select: {
                        id: true,
                        name: true,
                        duration: true,
                        price: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!appointments || appointments.length === 0) {
            throw new common_1.NotFoundException('Nenhum agendamento encontrado');
        }
        return appointments;
    }
    async updateAppointment(id, updateData, req) {
        try {
            const userId = req.user?.id;
            const userRole = req.user?.role;
            const existing = await this.prisma.appointment.findUnique({
                where: { id },
                include: {
                    user: true,
                    service: true,
                },
            });
            if (!existing) {
                throw new common_1.NotFoundException('Agendamento não encontrado');
            }
            if (userId && existing.userId !== userId && userRole !== 'admin') {
                throw new common_1.ForbiddenException('Ação não permitida');
            }
            const updated = await this.prisma.appointment.update({
                where: { id },
                data: {
                    ...updateData,
                    canceledById: updateData.canceledById
                        ? Number(updateData.canceledById)
                        : null,
                    updatedAt: new Date(),
                },
                include: {
                    service: { select: { id: true, name: true } },
                    user: { select: { id: true, name: true } },
                },
            });
            if (updateData.status === 'canceled') {
                const [clientTokens, professionalUsers] = await Promise.all([
                    this.prisma.pushToken.findMany({
                        where: { userId: existing.userId },
                    }),
                    this.prisma.user.findMany({
                        where: {
                            role: { in: ['professional', 'admin'] },
                            PushToken: { some: {} },
                        },
                        include: { PushToken: true },
                    }),
                ]);
                for (const token of clientTokens) {
                    await this.notificationsService.sendPushNotification(token.token, 'Seu agendamento foi cancelado', `O agendamento do serviço "${existing.service.name}" foi cancelado.`);
                    await this.prisma.notification.create({
                        data: {
                            userId: existing.userId,
                            message: `Seu agendamento do serviço "${existing.service.name}" foi cancelado.`,
                            type: 'appointment-canceled',
                        },
                    });
                }
                for (const prof of professionalUsers) {
                    for (const token of prof.PushToken) {
                        await this.notificationsService.sendPushNotification(token.token, 'Agendamento cancelado', `Um cliente cancelou o agendamento do serviço "${existing.service.name}".`);
                        await this.prisma.notification.create({
                            data: {
                                userId: prof.id,
                                message: `O cliente ${existing.user.name} cancelou o serviço "${existing.service.name}".`,
                                type: 'appointment-canceled',
                            },
                        });
                    }
                }
            }
            return updated;
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Registro não encontrado');
            }
            throw new common_1.HttpException(error.message || 'Falha na atualização', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteAppointment(id, deleteData, userId) {
        const appointment = await this.prisma.appointment.findUnique({
            where: { id },
        });
        if (!appointment) {
            throw new common_1.NotFoundException('Agendamento não encontrado');
        }
        if (userId && appointment.userId !== userId) {
            throw new common_1.ForbiddenException('Você só pode cancelar seus próprios agendamentos');
        }
        return this.prisma.appointment.update({
            where: { id },
            data: {
                status: 'canceled',
                cancellationReason: deleteData.cancellationReason,
                canceledById: deleteData.canceledBy,
                canceledAt: new Date(),
            },
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient, notifications_service_1.NotificationsService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map