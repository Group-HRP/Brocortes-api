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
exports.BlockedHoursController = void 0;
const common_1 = require("@nestjs/common");
const blocked_hours_service_1 = require("../service/blocked-hours.service");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const roles_guard_1 = require("../../user/guards/roles.guard");
const create_blockedHours_dto_1 = require("../DTO/create.blockedHours.dto");
const filter_blockedHours_dto_1 = require("../DTO/filter.blockedHours.dto");
const response_blockedHours_dto_1 = require("../DTO/response.blockedHours.dto");
let BlockedHoursController = class BlockedHoursController {
    constructor(blockedHoursService) {
        this.blockedHoursService = blockedHoursService;
    }
    async createBlockedHours(createBlockedHours) {
        try {
            const blockedHours = await this.blockedHoursService.createBlockedHours(createBlockedHours);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Horário bloqueado criado com sucesso',
                data: blockedHours,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message || error.message);
        }
    }
    async getBlockedHours(filters) {
        try {
            const blockedHours = await this.blockedHoursService.getBlockedHours(filters);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Horários bloqueados encontrados com sucesso',
                data: blockedHours.map((bh) => new response_blockedHours_dto_1.BlockedHoursResponseDto(bh)),
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR, error.message || error.message);
        }
    }
    async deleteBlockedHours(id) {
        if (!id) {
            throw new common_1.HttpException('Horario bloqueado não encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const blockedHours = await this.blockedHoursService.deleteBlockedHours(id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Horário bloqueado deletado com sucesso',
            data: blockedHours,
        };
    }
};
exports.BlockedHoursController = BlockedHoursController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blockedHours_dto_1.CreateBlockedHoursDto]),
    __metadata("design:returntype", Promise)
], BlockedHoursController.prototype, "createBlockedHours", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_blockedHours_dto_1.BlockedHoursFilterDto]),
    __metadata("design:returntype", Promise)
], BlockedHoursController.prototype, "getBlockedHours", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlockedHoursController.prototype, "deleteBlockedHours", null);
exports.BlockedHoursController = BlockedHoursController = __decorate([
    (0, common_1.Controller)('blocked-hours'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [blocked_hours_service_1.BlockedHoursService])
], BlockedHoursController);
//# sourceMappingURL=blocked-hours.controller.js.map