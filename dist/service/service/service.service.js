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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let ServiceService = class ServiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createServiceDto) {
        try {
            if (createServiceDto.duration <= 0) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Duration must be greater than 0',
                    error: 'Bad Request',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (createServiceDto.price <= 0) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Price must be greater than 0',
                    error: 'Bad Request',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const service = await this.prisma.service.create({
                data: createServiceDto,
            });
            return service;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: 'Service with this name already exists',
                    error: 'Conflict',
                }, common_1.HttpStatus.CONFLICT);
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create service',
                error: 'Internal Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const services = await this.prisma.service.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    duration: true,
                    price: true,
                },
            });
            return services;
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Falha ao listar serviços', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateServiceDto) {
        try {
            const service = await this.prisma.service.update({
                where: { id: Number(id) },
                data: updateServiceDto,
            });
            return service;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: 'Service with this name already exists',
                    error: 'Conflict',
                }, common_1.HttpStatus.CONFLICT);
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to update service',
                error: 'Internal Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id, deleteServiceOptionsDto) {
        try {
            const existingService = await this.prisma.service.findUnique({
                where: { id: Number(id) },
            });
            if (!existingService) {
                throw new common_1.NotFoundException('Service nao encontrado');
            }
            const hardDelete = await this.prisma.service.delete({
                where: { id: Number(id) },
            });
            return hardDelete;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to delete service',
                error: 'Internal Server Error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], ServiceService);
//# sourceMappingURL=service.service.js.map