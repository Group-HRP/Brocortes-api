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
exports.BlockedHoursResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class BlockedHoursResponseDto {
    id;
    date;
    reason;
    createdAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.BlockedHoursResponseDto = BlockedHoursResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID do bloqueio' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BlockedHoursResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-12-25T14:00:00Z',
        description: 'Data e hora bloqueada',
        type: String,
        format: 'date-time',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], BlockedHoursResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Feriado de Natal',
        description: 'Motivo do bloqueio',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BlockedHoursResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-12-20T09:00:00Z',
        description: 'Data de criação do registro',
        type: String,
        format: 'date-time',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], BlockedHoursResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=response.blockedHours.dto.js.map