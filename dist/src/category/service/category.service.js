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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let CategoryService = class CategoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async serviceExisting(serviceId) {
        const service = await this.prisma.service.findUnique({
            where: { id: serviceId },
        });
        if (!service) {
            throw new common_1.NotFoundException('Servico nâo encontrado');
        }
        return service;
    }
    async create(createCategoryDto) {
        const { name, serviceIds } = createCategoryDto;
        const services = await this.prisma.service.findMany({
            where: {
                id: { in: serviceIds },
            },
        });
        if (services.length !== serviceIds.length) {
            throw new common_1.BadRequestException('Um ou mais serviços não existem');
        }
        const category = await this.prisma.category.create({
            data: {
                name,
                service: {
                    connect: serviceIds.map((id) => ({ id }))
                }
            },
        });
        return category;
    }
    async findAll() {
        return this.prisma.category.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
    }
    async findOne(id) {
        const categoryList = await this.prisma.category.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                service: {
                    select: {
                        id: true,
                        name: true
                    }
                },
            },
        });
        if (!categoryList) {
            throw new common_1.NotFoundException('Nenhuma cateogria encontrada');
        }
        return categoryList;
    }
    async update(id, updateCategoryDto) {
        const categoryExisting = await this.findOne(id);
        if (!categoryExisting) {
            throw new common_1.NotFoundException('Categoria não encontrada');
        }
        if (!updateCategoryDto.serviceIds || updateCategoryDto.serviceIds.length === 0) {
            throw new common_1.BadRequestException('Serviços não informados');
        }
        const serviceExisting = await this.prisma.service.findMany({
            where: {
                id: {
                    in: updateCategoryDto.serviceIds,
                },
            },
        });
        if (!serviceExisting) {
            throw new common_1.NotFoundException('Um ou mais serviços não encontrados');
        }
        const categoryUpdate = await this.prisma.category.update({
            where: { id: id },
            data: {
                name: updateCategoryDto.name,
                service: {
                    set: updateCategoryDto.serviceIds.map((id) => ({ id })),
                },
            },
            select: {
                id: true,
                name: true,
                service: true,
            },
        });
        return categoryUpdate;
    }
    async remove(id) {
        const categoryExisting = await this.findOne(id);
        const categoryDelete = await this.prisma.category.delete({
            where: { id: id },
        });
        return categoryDelete;
    }
    async removeService(id, serviceId) {
        const categoryExisting = await this.findOne(id);
        const serviceExisting = await this.serviceExisting(serviceId);
        const serviceDelete = await this.prisma.category.update({
            where: { id: serviceId },
            data: {
                service: {
                    disconnect: { id: serviceId },
                },
            },
        });
        return serviceDelete;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], CategoryService);
//# sourceMappingURL=category.service.js.map