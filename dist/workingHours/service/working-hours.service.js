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
const date_fns_1 = require("date-fns");
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
    async getAvailableTimes(date, serviceId) {
        const parsedDate = new Date(date);
        if (!parsedDate || isNaN(parsedDate.getTime())) {
            throw new common_1.BadRequestException('Data inválida.');
        }
        const dayOfWeek = parsedDate
            .toLocaleDateString('en-US', { weekday: 'long' })
            .toLocaleLowerCase();
        const workingHour = await this.prisma.workingHours.findFirst({
            where: { dayOfWeek },
        });
        if (!workingHour || workingHour.isClosed) {
            return [];
        }
        const service = await this.prisma.service.findUnique({
            where: { id: Number(serviceId) },
        });
        if (!service) {
            throw new common_1.BadRequestException('Serviço não encontrado.');
        }
        const duration = service.duration;
        const oppeningTime = (0, date_fns_1.parse)(`${date} ${workingHour.openingTime}`, 'yyyy-MM-dd HH:mm', new Date());
        const closingTime = (0, date_fns_1.parse)(`${date} ${workingHour.closingTime}`, 'yyyy-MM-dd HH:mm', new Date());
        const appointments = await this.prisma.appointment.findMany({
            where: {
                date: {
                    gte: oppeningTime,
                    lt: closingTime,
                },
            },
            select: {
                date: true,
            },
        });
        const bookedSlots = appointments.map((app) => (0, date_fns_1.format)(app.date, 'HH:mm'));
        const avaliableSlots = [];
        let currentSlot = oppeningTime;
        while ((0, date_fns_1.isBefore)((0, date_fns_1.addMinutes)(currentSlot, duration), closingTime) ||
            +(0, date_fns_1.addMinutes)(currentSlot, duration) === +closingTime) {
            const slotFormatted = (0, date_fns_1.format)(currentSlot, 'HH:mm');
            const isBooked = bookedSlots.includes(slotFormatted);
            if (!isBooked) {
                avaliableSlots.push(slotFormatted);
            }
            currentSlot = (0, date_fns_1.addMinutes)(currentSlot, duration);
        }
        return avaliableSlots;
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