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
exports.UpdateBlockedHoursDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateBlockedHoursDto {
    date;
    reason;
}
exports.UpdateBlockedHoursDto = UpdateBlockedHoursDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-12-31T14:00:00Z',
        description: 'Nova data e hora (opcional)',
        required: false,
        type: String,
        format: 'date-time',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateBlockedHoursDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Recesso de fim de ano',
        description: 'Novo motivo (opcional)',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateBlockedHoursDto.prototype, "reason", void 0);
//# sourceMappingURL=update.blockedHours.dto.js.map