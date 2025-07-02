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
exports.UpdateAppointmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const appointments_status_enum_1 = require("../../enums/appointments.status.enum");
class UpdateAppointmentDto {
    serviceId;
    date;
    status;
    canceledAt;
    canceledById;
    cancellationReason;
}
exports.UpdateAppointmentDto = UpdateAppointmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID do serviço (apenas admin)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateAppointmentDto.prototype, "serviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-12-15T15:00:00Z',
        description: 'Nova data do agendamento (apenas admin)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateAppointmentDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'completed',
        description: 'Status do agendamento',
        enum: appointments_status_enum_1.AppointmentStatus,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(appointments_status_enum_1.AppointmentStatus),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-06-28T14:00:00Z',
        description: 'Data de cancelamento',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], UpdateAppointmentDto.prototype, "canceledAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID do usuário que cancelou',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateAppointmentDto.prototype, "canceledById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Cliente não compareceu',
        description: 'Motivo do cancelamento',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAppointmentDto.prototype, "cancellationReason", void 0);
//# sourceMappingURL=update.appointments.dto.js.map