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
exports.BlockedHoursFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BlockedHoursFilterDto {
}
exports.BlockedHoursFilterDto = BlockedHoursFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-12-01',
        description: 'Filtrar a partir desta data',
        required: false,
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], BlockedHoursFilterDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-12-31',
        description: 'Filtrar até esta data',
        required: false,
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], BlockedHoursFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Feriado',
        description: 'Filtrar por motivo (contém o texto)',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], BlockedHoursFilterDto.prototype, "reason", void 0);
//# sourceMappingURL=filter.blockedHours.dto.js.map