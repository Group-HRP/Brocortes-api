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
exports.BlockedHoursService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let BlockedHoursService = class BlockedHoursService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBlockedHours(createBlockedHours) {
        if (!createBlockedHours.date || !createBlockedHours.reason) {
            throw new common_1.BadRequestException('Data e motivo são obrigatórios');
        }
        const blockedHours = await this.prisma.blockedHours.create({
            data: {
                date: createBlockedHours.date,
                reason: createBlockedHours.reason,
            },
        });
        return blockedHours;
    }
    async getBlockedHours(filters) {
        const where = {};
        if (filters.date) {
            where['date'] = {
                equals: new Date(filters.date),
            };
        }
        if (filters.date && filters.endDate) {
            where['date'] = {
                gte: new Date(filters.date),
                lte: new Date(filters.endDate),
            };
        }
        else if (filters.endDate) {
            where['date'] = {
                lte: new Date(filters.endDate),
            };
        }
        if (filters.reason) {
            where['reason'] = {
                contains: filters.reason,
                mode: 'insensitive',
            };
        }
        const blockedHours = await this.prisma.blockedHours.findMany({
            where,
            orderBy: {
                date: 'asc',
            },
            select: {
                id: true,
                date: true,
                reason: true,
                createdAt: true,
            },
        });
        if (blockedHours.length === 0) {
            throw new common_1.NotFoundException('Nenhum horário bloqueado encontrado com os filtros fornecidos');
        }
        return blockedHours;
    }
    async deleteBlockedHours(id) {
        const blockedHoursId = await this.prisma.blockedHours.findUnique({
            where: { id },
        });
        if (!blockedHoursId) {
            throw new common_1.NotFoundException('Horário bloqueado não encontrado');
        }
        const blockedHours = await this.prisma.blockedHours.delete({
            where: {
                id,
            },
        });
        return blockedHours;
    }
};
exports.BlockedHoursService = BlockedHoursService;
exports.BlockedHoursService = BlockedHoursService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], BlockedHoursService);
//# sourceMappingURL=blocked-hours.service.js.map