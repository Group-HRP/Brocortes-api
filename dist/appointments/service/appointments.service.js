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
let AppointmentsService = class AppointmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
            return appointments;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Erro ao criar agendamento', error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllAppointments(req) {
        const user = req.user.id;
        const appointments = await this.prisma.appointment.findFirst({
            where: {
                userId: user,
            },
            include: {
                service: { select: { id: true, name: true, duration: true, price: true } },
            },
        });
        if (!appointments) {
            throw new common_1.NotFoundException('Nenhum agendamento encontrado');
        }
        return appointments;
    }
    async getAppointments(clientId) {
        const appointments = await this.prisma.appointment.findMany({
            where: { userId: clientId },
            include: {
                service: { select: { id: true, name: true } },
            },
        });
        return appointments;
    }
    async updateAppointment(id, updateData, userId) {
        try {
            const existing = await this.prisma.appointment.findUnique({
                where: { id },
            });
            if (!existing) {
                throw new common_1.NotFoundException('Agendamento não encontrado');
            }
            if (userId && existing.userId !== userId) {
                throw new common_1.ForbiddenException('Ação não permitida');
            }
            const updated = await this.prisma.appointment.update({
                where: { id },
                data: {
                    ...updateData,
                    updatedAt: new Date(),
                },
                include: {
                    service: { select: { id: true, name: true } },
                    user: { select: { id: true, name: true } },
                },
            });
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
    __metadata("design:paramtypes", [client_1.PrismaClient])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map