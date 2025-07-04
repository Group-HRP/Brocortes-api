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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const service_service_1 = require("../service/service.service");
const create_service_dto_1 = require("../DTO/create.service.dto");
const roles_guard_1 = require("../../user/guards/roles.guard");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const response_service_dto_1 = require("../DTO/response.service.dto");
const update_service_dto_1 = require("../DTO/update.service.dto");
const delete_service_dto_1 = require("../DTO/delete.service.dto");
let ServiceController = class ServiceController {
    serviceService;
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async create(createServiceDto) {
        try {
            const createdService = await this.serviceService.create(createServiceDto);
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Service created successfully',
                data: createdService,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error while creating service',
                error: 'Internal Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        const services = await this.serviceService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Serviços listados com sucesso',
            data: services.map((services) => new response_service_dto_1.ServiceResponseDto(services)),
        };
    }
    async findOneServiceNotCategory(categoryId) {
        const service = await this.serviceService.findOneServiceNotCategory(categoryId);
    }
    async update(id, updateServiceDto) {
        try {
            const updatedService = await this.serviceService.update(id, updateServiceDto);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Serviço atualizado com sucesso',
                data: updatedService,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Erro ao atualizar serviço',
                error: 'Internal Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id, deleteServiceOptionsDto) {
        try {
            await this.serviceService.remove(id, deleteServiceOptionsDto);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'Serviço removido com sucesso',
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Erro ao remover serviço',
                error: 'Internal Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/category/:categoryId"),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "findOneServiceNotCategory", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, delete_service_dto_1.DeleteServiceOptionsDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "remove", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)('service'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
//# sourceMappingURL=service.controller.js.map