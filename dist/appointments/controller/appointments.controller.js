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
    async getAppointments(clientId) {
        const appointments = await this.appointmentsService.getAppointments(clientId);
        return appointments;
    }
    async updateAppointment(id, updateData, req) {
        if (req.user.role === 'client') {
            updateData = {
                status: updateData.status,
            };
        }
        const result = await this.appointmentsService.updateAppointment(id, updateData, req.user.role === 'client' ? req.user.id : undefined);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Atualizado com sucesso',
            data: new response_appointments_dto_1.AppointmentResponseDto(result),
        };
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
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointments_dto_1.CreateAppointmentDto]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAllAppointments", null);
__decorate([
    (0, common_1.Get)(':clientId'),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "getAppointments", null);
__decorate([
    (0, common_1.Patch)(':id'),
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
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, delete_appointment_dto_1.DeleteAppointmentDto, Object]),
    __metadata("design:returntype", Promise)
], AppointmentsController.prototype, "deleteAppointment", null);
exports.AppointmentsController = AppointmentsController = __decorate([
    (0, common_1.Controller)('appointments'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsController);
//# sourceMappingURL=appointments.controller.js.map