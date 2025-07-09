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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("../service/appointments.service");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../user/guards/roles.guard");
const create_appointments_dto_1 = require("../DTO/create.appointments.dto");
const update_appointments_dto_1 = require("../DTO/update.appointments.dto");
const response_appointments_dto_1 = require("../DTO/response.appointments.dto");
const delete_appointment_dto_1 = require("../DTO/delete.appointment.dto");
const swagger_1 = require("@nestjs/swagger");
let AppointmentsController = class AppointmentsController {
    appointmentsService;
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    async createAppointment(createAppointmentsDto) {
        try {
            const appointments = await this.appointmentsService.createAppointment(createAppointmentsDto);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Agendamento criado com sucesso',
                data: new response_appointments_dto_1.AppointmentResponseDto(appointments),
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.statusCode || common_1.HttpStatus.BAD_REQUEST, error.message || error.message);
        }
    }
    async getAllAppointments(req) {
        try {
            const appointments = await this.appointmentsService.getAllAppointments(req);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Agendamentos encontrados com sucesso',
                data: appointments,
            };
        }
        catch (error) { }
    }
    async getAllHistoricAppointments() {
        const appointments = await this.appointmentsService.getAllHistoricAppointments();
        return appointments;
    }
    async getHistoricAppointments(id, req) {
        const appointments = await this.appointmentsService.getHistoricAppointments(id, req);
        return appointments;
    }
    async getAppointmentUnique(appointmentId) {
        const appointment = await this.appointmentsService.getAppointmentUnique(appointmentId);
        return appointment;
    }
    async updateAppointment(id, updateData, req) {
        const appointment = await this.appointmentsService.updateAppointment(id, updateData, req);
        return appointment;
    }
    async deleteAppointment(id, deleteAppointment, req) {
        if (!deleteAppointment.confirm) {
            throw new common_1.BadRequestException('Confirme o cancelamento com confirm=true');
        }
        const userId = req.user.role === 'client' ? req.user.id : undefined;
        const result = await this.appointmentsService.deleteAppointment(id, {
            cancellationReason: deleteAppointment.cancellationReason,
            canceledBy: req.user.id,
        }, userId);
        return {
            success: true,
            message: req.user.role === 'admin'
                ? 'Agendamento deletado permanentemente'
                : 'Agendamento cancelado',
            appointmentId: id,
            canceledAt: new Date(),
        };
    }
};
exports.AppointmentsController = AppointmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Cria um agemdamento" }),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointments_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Lista todos os agendametos para o usuario" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        schema: {
            example: {
                message: "Todos os agendamentos listado",
                appointment: {
                    id: 10,
                    userId: 6,
                    serviceId: 2,
                    date: "2025-06-30T09:00:00.000Z",
                    status: "scheduled",
                    createdAt: "2025-07-07T01:53:27.972Z",
                    updatedAt: "2025-07-07T01:53:27.972Z",
                    canceledAt: null,
                    canceledById: null,
                    cancellationReason: null,
                    service: {
                        id: 2,
                        name: "Corte de Cabelo",
                        duration: 15,
                        price: 10
                    },
                    user: {
                        id: 6,
                        name: "ryan"
                    }
                },
            }
        }
    }),
    (0, roles_decorator_1.Roles)('admin', 'client', 'professional'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAllAppointments", null);
__decorate([
    (0, common_1.Get)('/historic-appointment'),
    (0, swagger_1.ApiOperation)({ summary: "Lista todo o historico de agendameto para o professional e o admin" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Lista todo o historico",
        example: {
            id: 5,
            userId: 2,
            serviceId: 1,
            date: "2025-06-29T14:30:00.000Z",
            status: "canceled",
            createdAt: "2025-06-29T20:19:51.254Z",
            updatedAt: "2025-06-29T20:38:22.865Z",
            canceledAt: "2025-06-29T20:38:23.996Z",
            canceledById: 1,
            cancellationReason: null,
            service: {
                id: 1,
                name: "Sobrancelha",
                duration: 15,
                price: 10
            }
        }
    }),
    (0, roles_decorator_1.Roles)('admin', 'professional'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAllHistoricAppointments", null);
__decorate([
    (0, common_1.Get)('/historic-appointment/:id'),
    (0, swagger_1.ApiOperation)({ summary: "Lista um historico especifico" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Lista historico por ID",
        schema: {
            example: {
                id: 1,
                userId: 2,
                serviceId: 1,
                date: "2023-12-15T14:30:00.000Z",
                status: "completed",
                createdAt: "2025-06-28T19:23:49.550Z",
                updatedAt: "2025-06-29T21:12:46.266Z",
                canceledAt: "2025-06-29T15:19:39.833Z",
                canceledById: null,
                cancellationReason: null,
                service: {
                    id: 1,
                    name: "Sobrancelha",
                    duration: 15,
                    price: 10
                },
                user: {
                    name: "Pedro Paraiso"
                }
            },
        }
    }),
    (0, roles_decorator_1.Roles)('admin', 'client', 'professional'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getHistoricAppointments", null);
__decorate([
    (0, common_1.Get)(':appointmentId'),
    (0, swagger_1.ApiOperation)({ summary: "Lista um agemdamento especifico" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Appointment details',
        schema: {
            example: {
                id: 2,
                userId: 2,
                serviceId: 1,
                date: "2025-12-15T14:30:00.000Z",
                status: "scheduled",
                createdAt: "2025-06-28T19:24:18.076Z",
                updatedAt: "2025-06-28T19:24:18.076Z",
                canceledAt: null,
                canceledById: null,
                cancellationReason: null,
                service: {
                    id: 1,
                    name: "Sobrancelha",
                    duration: 15,
                    price: 10
                },
                user: {
                    name: "Pedro Paraiso"
                }
            }
        }
    }),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Param)('appointmentId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointmentUnique", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Atualiza um agemdamento" }),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_appointments_dto_1.UpdateAppointmentDto, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "updateAppointment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Deleta um agemdamento" }),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, delete_appointment_dto_1.DeleteAppointmentDto, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "deleteAppointment", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map