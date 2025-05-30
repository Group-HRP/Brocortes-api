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
exports.WorkingHoursService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let WorkingHoursService = class WorkingHoursService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createWorkingHourDto) {
        const existingWorkingHour = await this.prisma.workingHours.findFirst({
            where: {
                dayOfWeek: createWorkingHourDto.dayOfWeek,
            },
        });
        if (existingWorkingHour) {
            throw new Error(`Working hour for ${createWorkingHourDto.dayOfWeek} already exists.`);
        }
        const workingHour = await this.prisma.workingHours.create({
            data: createWorkingHourDto,
        });
        return workingHour;
    }
    async findAll() {
        return this.prisma.workingHours.findMany({
            orderBy: {
                dayOfWeek: 'asc',
            },
            select: {
                id: true,
                dayOfWeek: true,
                openingTime: true,
                closingTime: true,
            },
        });
    }
    async findOne(id) {
        const workingHour = await this.prisma.workingHours.findUnique({
            where: { id: id },
            select: {
                id: true,
                dayOfWeek: true,
                openingTime: true,
                closingTime: true,
            },
        });
        return workingHour;
    }
    async update(id, updateWorkingHourDto) {
        const existingWorkingHour = await this.findOne(id);
        if (!existingWorkingHour) {
            throw new common_1.NotFoundException(`Horario de trabalho com ID ${id} não encontrado.`);
        }
        const updatedWorkingHour = await this.prisma.workingHours.update({
            where: { id: id },
            data: updateWorkingHourDto,
        });
        return updatedWorkingHour;
    }
    async remove(id) {
        const existingWorkingHour = await this.findOne(id);
        if (!existingWorkingHour) {
            throw new common_1.NotFoundException(`Horario de trabalho com ID ${id} não encontrado.`);
        }
        const deleteWorkingHour = await this.prisma.workingHours.delete({
            where: { id: id },
        });
        return deleteWorkingHour;
    }
};
exports.WorkingHoursService = WorkingHoursService;
exports.WorkingHoursService = WorkingHoursService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], WorkingHoursService);
//# sourceMappingURL=working-hours.service.js.map