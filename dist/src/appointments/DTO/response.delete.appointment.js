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
exports.DeleteAppointmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class DeleteAppointmentResponseDto {
    success;
    message;
    appointmentId;
    canceledAt;
}
exports.DeleteAppointmentResponseDto = DeleteAppointmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Indica sucesso da operação' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], DeleteAppointmentResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Agendamento cancelado',
        description: 'Mensagem de status',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DeleteAppointmentResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID do agendamento' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DeleteAppointmentResponseDto.prototype, "appointmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-12-15T10:30:00Z',
        description: 'Data/hora do cancelamento',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], DeleteAppointmentResponseDto.prototype, "canceledAt", void 0);
//# sourceMappingURL=response.delete.appointment.js.map